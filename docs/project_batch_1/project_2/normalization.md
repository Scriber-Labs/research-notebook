# Normalization

!!! tip "Born Rule and Physical Interpretability"

    In quantum mechanics, the **Born rule** requires that the total probability of finding a particle anywhere in space
    is equal to unity. For the 1D-TISE, this requires

    $$\int_{-\infty}^{\infty}{\| \psi (x) \|^2 \, dx} = 1 \, .$$

    On a uniform spatial grid with spacing $\Delta x$, the inttegral is replaced by a discretized sum, gving the
    constraint

    $$\sum_i{ \| \psi(x_i) \|^2 \Delta x } = 1 \, .$$

    Any neural network parameterizing a wavefunction must respect this constraint in order for its output to be a 
    physically interpretable quantum state.


!!! tip "Normalization By Construction"

    Normalization as a soft penalty in the loss function cannot guarantee exact satisfaction of the Born rule and also 
    entails competition with other loss terms. In order to avoid these complications all together, we enforce 
    **normalization by construction** inside the forward pass of the PIML network:

    ```py
    class NormalizedWaveFunctionNet(nn.Module):
        """Wraps an MLP to enforce L2 normalization by construction."""

    def __init__(self, base_net: nn.Module, dx: float) -> None:
        super().__init__()
        self.base_net = base_net
        self.dx = dx

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        psi_raw = self.base_net(x)
        nor_sq = torch.sum(psi_raw ** 2) * self.dx
        norm = torch.sqrt(norm_sq + 1e-8)
        return psi_raw / norm
    ```

    Given the output $\psi^\theta_\text{raw}(x)$ of the multilayer perceptron, we rescale it to the unit norm:

    $$\hat{\psi}^\theta(x) = \frac{\psi^\theta_\text{raw}(x)}{\sum_i{\psi^\theta_\text{raw}(x_i)^2} \Delta x + \epsilon} \, ,$$
    
    where $\epsilon=10^{-8}$ is a small constant added for numerical stability during training, when the network
        output may be near zero. 

    This approach is sometimes called **hard normalization** or **normalization by construction**. It is used 
    in Project 2 to ensure that every wavefunction emitted by the model is a valid quantum state at every
    training step. It also eliminates the need for a dedicated normalization loss term, thus eliminating the
    need for the optimizer to trade physical validity against other objectives such as the Schrödinger residual
    or data mismatch.

!!! eignote "Orthonormalization"

    Orthonormalization is performed via $L^2$ inner product with trapezoidal weighting and Gram-Schmidt 
    orthogonalization. 

    - $L^2$ **normalization** guarantees a unit norm but does *not* enforce orthogonality between distinct
      eigenfunctions. 

    - Sequential **Gram-Schmidt orthogonalization** ensures that the learned eigenfunctions satisfy the 
      orthogonality requirements of Hamiltonian eigenstates:

        $$\langle \hat{\psi}_n^\theta | \hat{\psi}_m^\theta \rangle = \delta_{nm} \, .$$

    - The **trapezoidal rule** provides a discrete approximation to the continuous Hilbert-space inner product 
      on the uniform spatial grid.