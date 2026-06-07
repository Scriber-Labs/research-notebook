# Figure Analysis (Windows)

## Figure 1
![training_curves.png](figure_files/training_curves.png)

!!! note "🏡 **Take-Home Message**"

    The optimizer exhibits three distinct regime transitions before settling on a stable plateau.


!!! note "🔑 **Key Insights**"

    1. **Spike 1 ($\approx$ 0-50 epochs)** - Expected transient while the network adjusts from random initial weights.
    2. **Spike 2 ($\approx$ 800 epochs)** - Discovery of a higher-curvature potential: smoothness and total loss spike, physics and data terms rise only moderately.
    3. **Spike 3 ($\approx$ 2000 epoochs)** - Order-of-magnitude jump in the smootheness term propagates into the physics loss; a new plateau follows with lower smothness fidelity, but improved data fit.

!!! fail "❌ **Failure Modes**"

    | **Verdict** | **Failure Mode** | **Description** | **Explanation** |
    | :---------- | :--------------- | :-------------- | :-------------- |
    | ❌ | High final loss | Optimizer stalls in a local minimum. | Total loss remains greater than 1e-1 at epoch 6000. |
    | ✔️ | Oscillation avoided | Unbalanced loss weights can cause loss terms to oscillate. | Curves converge monotonically after Spike 3. |
    | ❌ | Physics collapse | Data loss decreases, while TISE residual increases. | Indicates operator inconsistency. |
    | ❌ | Over-regularization | Smoothness term dominates, spectrum becomes innacurate. | Post-Spike 3 plateau shows $\lambda_\text{smooth}$ is much greater than others. | 


## Figure 2
![learned_potential.png](figure_files/learned_potential.png)

!!! note "🏡 **Take-Home Message**"

    The learned potential $V_\theta(x)$ (sigmoidal) differs markedly from the harmonic ground truth $V(x)=\tfrac12 x^2$.

!!! note "🔑 **Key Insights**"

    1. Central regions of the learned eigenfunctions (Fig. 3) and densities (Fig. 5) match the ground truth far better than the tails.
    2. The model learns only the portion of $H_\theta$ required to reproduce high-probability regions, exposing the inverse problem's under-determinism.

!!! fail "❌ **Failure Modes**"

    | **Verdict** | **Failure Mode**              | **Description**                                                                          | **Explanation**                                                    |
    |:------------|:------------------------------|:-----------------------------------------------------------------------------------------|:-------------------------------------------------------------------|
    | ❌           | Gemoetric mismatch       | Learned $V_\theta$ shape incompatible with true quadratic.                               | Central well too narrow; tails saturate at $V_\theta \approx \pm 12 $. |
    | ❌           | Boundary under-constraint | Sparse data at $x \in (-\infty, -4.5] \cup [4.5, \infty)$ allows the potential to drift. | Grey dashed domain limits show no training points beyond. |


## Figure 3
![learned_wavefunctions.png](figure_files/learned_wavefunctions.png)

!!! note "🏡 **Take-Home Message**"

    Learned eigenfunctions $\psi_n^\theta(x)$ capture the nodal pattern but diverge in low-amplitude tail regions.

!!! note "🔑 **Key Insights**"

    1. **Phase matching** - Correct nodal count confirms energy ordering.
    2. **Central accuracy** - Highest fidelity occurs where $|\psi_n|^2$ is largest.
    3. **Tail divergence** - For $x \in (-4.5, -2] \cup [2, 4.5)$, the learned curves overshoot, reflecting data scarcity.

!!! fail "❌ **Failure Modes**"

    | **Verdict** | **Failure Mode** | **Description** | **Explanation**                            |
    | :---------- | :--------------- | :-------------- |:-------------------------------------------|
    | ❌ | Nodal mis-count | Extra nodes appear beyond $x \approx \pm 3$) | Indicates spectral leakage.                |
    | ✔️ | Sign / parity flip | Unaligned solutions may invert parity | Sign aligned; parity matches ground truth. |
    | ❌ | Spurious oscillations | High-frequency ripples in tails from weak $V_\theta$ smoothness. | Visible beyond $x\approx \pm 4$.           |


## Figure 4
![learned_energies.png](figure_files/learned_energies.png)

!!! note "🏡 **Take-Home Message**"

    Learned energies $E_n^\theta$ follow the harmonic spectrum $E_n=n+\tfrac12$ and match observations within 5 %.

!!! note "🔑 **Key Insights**"

    1. Correct ordering suggests $\mathcal{L}_\text{order}$ is effective.
    2. Spectrum remains stable despite 2 % Gaussian noise in training data.

!!! fail "❌ **Failure Modes**"

    | **Verdict** | **Failure Mode** | **Description** | **Explanation** |
    | :---------- | :--------------- | :-------------- | :-------------- |
    | ❌ | Spectral fit, wrong operator | Energies match, but $V_\theta$ deviates (see Fig. 2) |

## Figure 5
![density.png](figure_files/density.png)

!!! note "🏡 **Take-Home Message**"

    Learned densities, $\rho_n^\theta = |\psi_n^\theta|^2$ agree with 2 %-noise observations.

!!! note "🔑 **Key Insights**"

    1. **Noise filtering** - PINN acts as a physics-informed smoother.
    2. **Data dominance** - Good density fit persists even with incorrect potential (Fig. 2), confirming $\mathcal{L}_\text{data}$ is easy to minimize.

!!! fail "❌ **Failure Modes**"

    | **Verdict** | **Failure Mode** | **Description** | **Explanation** |
    | :---------- | :--------------- | :-------------- | :-------------- |
    | ✔️ | Peak flattening | Excessive $\lambda_\text{smooth}$ can lower peaks | Peaks are preserved $\Rightarrow$ smoothing is well-tuned. |
    | ✔️ | Mode merging | Energy mis-ordering can collapse multiple states onto one density. |

## Figure 6
![pod_singular_values.png](figure_files/pod_singular_values.png)

!!! note "🏡 **Take-Home Message**"

    The POD spectrum shows how many independent "modes" are present in the learned wavefunction ensemble. Three dominant values indicate a rank-3 subspace.


!!! note "🔑 **Key Insights**"

    - Singular value decay is evident from the sharp drop of in $\sigma_n$ after $N=3$. This suggests the model effectively captured the target dimensionality.
    - Note: Small but non-zero singular values represent residual noise or model complexity (noise floor).


!!! fail "❌ **Failure Modes**"
    
    - **Degenerate singular values**: Multiple modes having equivalent singualr values, indicating either physical symmetry or model under-parameterization. Figure 6 shows this degeneracy was succeessfully avoided by the model.
    - **Slow decay**: Indicates that the basis is not compact and the model is capturing too much noise.
        - [ ] Need to elaborate on this in the context of singular value results in figure 6.
    
## Figure 7
![overlap_heatmap.png](figure_files/overlap_heatmap.png)

!!! note "🏡 **Take-Home Message**"
    
    Orthonormalization was successful and POD analysis is appropriately perfomed so that learned wavefunctions and POD modes are represented in terms of orthogonal basis functions, facilitating efficient and accurate representation of the underlying physical phenomena.

!!! note "🔑 **Key Idea**
    
    - **Self-Orthogonality**: The inner product between learned wavefunctions gives the identity matrix, confirming orthonormalizaiton.
    - **Coupling**: Even if states are orthonormal, they remain coupled through the shared learned potential $V_\theta(x)$ and the TISE loss.

!!! fail "❌ **Failure Modes**

    - Non-identity diagonals: Indicates numerical error in the normalization layer of integration. Figure 6 confirms this failure mode did not occur in the current analysis.
    - Significant off-diagonals: Loss of orthogonality, liekly due to optimization failure or conflicting gradients. Figure 6 confirms this failure mode did not occur in the current analysis.

## Figure 8
![pod_modes.png](figure_files/pod_modes.png)

## Figure 9
![cross_overlap_heatmap.png](figure_files/cross_overlap_heatmap.png)

## Figure 10
![pod_temporal_modes.png](figure_files/pod_temporal_modes.png)

## Figure 11
![pod_temporal_overlap.png](figure_files/pod_temporal_overlap.png)

!!! note "🏡 Take-Home Message"

    The inner product beween temporal modes returns the identity matrix. 
    This indicates that the temporal modes are orthogonal, which is a key property for POD analysis. It validates that each temporal mode represents a unique aspect of the system's dynamics, facilitating efficient and accurate spectral representation of the underlying physical phenomena.


## Figure 12
![pod_temporal_cross_overlap.png](figure_files/pod_temporal_cross_overlap.png)