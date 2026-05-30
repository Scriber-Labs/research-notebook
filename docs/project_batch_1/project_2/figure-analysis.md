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
![overlap_heatmap.png](figure_files/overlap_heatmap.png)

## Figure 7
![pod_singular_values.png](figure_files/pod_singular_values.png)

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