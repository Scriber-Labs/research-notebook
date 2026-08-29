# Normalization

!!! tip "Normalization By Construction"

    Rather than enforcing normalization as a soft penalty in the loss function -- which would compete with other
    loss terms and never guarantee exact satisfaction – we enforce **normalization by construction** inside the
    forward pass of the PIML network. In particular, given the raw output $\psi_\text{raw}(x)$ of the multilayer
    perceptron, we rescale it to the unit norm:

    $$\hat{\psi}(x) = \frac{\psi_\text{raw}(x)}{\sum_i{\psi_\text{raw}(x_i)^2} \Delta x + \epsilon} \, ,$$
    
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