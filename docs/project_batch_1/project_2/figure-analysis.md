# Figure Analysis (Windows)

## Figure 1
![training_curves.png](figure_files/training_curves.png)

!!! note "🏡 **Take-Home Message**"

    The model successfully minimizes the total loss by balancing data fidelity with physical consistency (TISE) and smoothness constraints.


!!! note "🔑 **Key Insights**"

    - Insight 1
    - Insight 2

!!! fail "❌ **Failure Modes**"

    - High final loss: Optimization stalled in a local minimum.
    - Oscillation: Unbalanced loss weights causing the optimizer to swing back and forth between physics and data.



## Figure 2
![learned_potential.png](figure_files/learned_potential.png)

!!! note "🏡 **Take-Home Message**"

    The learned potential reproduces localized confinement structure and spectral consistency within regions supported by the learned eigenfunctions. However, the sigmoidal / piecewise-flat shape of $V_\theta(x)$ deviating substantially from expected quadratic shape of  the ground-truth harmonic potential.

!!! note "🔑 **Key Insights**"

    - Local structure is more identifiable than global structure.
    - The inverse Schrödinger problem remains fundamentally non-unique.
    - Constraint strength depends on wavefunction support.
    - Smoothness regularization stabilizes the inverse problem but biases geometry.

!!! fail "❌ **Failure Modes**"

    - Spectrally consistent but geometrically incorrect operators.
    - Boundary under-constraint.

## Figure 3
![learned_wavefunctions.png](figure_files/learned_wavefunctions.png)

!!! note "🏡 **Take-Home Message**"

    

!!! note "🔑 **Key Insights**"

    - 

!!! fail "❌ **Failure Modes**"

    - 

## Figure 4
![learned_energies.png](figure_files/learned_energies.png)

!!! note "🏡 **Take-Home Message**"

    The learned energy spectrum $\{E_n^\theta\}$ matches the observed values and closely follows the theoretical $E_n = n+0.5$ spacing of the 1-D harmonic osicllator.

!!! note "🔑 **Key Insights**"

    - $\mathcal{L}_\text{ordered}$ prevents state-swapping during early training.
    - The model generalizes from noisy energy observations to a consistent spectrum.

!!! fail "❌ **Failure Modes**"

    - **Collapsed spectrum:** All energies converging to the same value. This was prevented by $\mathcal{L}_\text{ordered}$.
    - **DC Offset:** Learned energies shifted by a constant, coupled with a vertical shift in $V_\theta(x)$. 
        - [ ] Need to write a more detailed analysis of the DC offset failure mode, including potential remedies and implications for the model's performance.

## Figure 5
![density.png](figure_files/density.png)

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


## Figure 12
![pod_temporal_cross_overlap.png](figure_files/pod_temporal_cross_overlap.png)