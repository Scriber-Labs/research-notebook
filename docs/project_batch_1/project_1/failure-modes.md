# Limitations and Observable Failure Modes

!!! eigenote "__1. Spectral bias and collocation resolution__"

    Increasing $\omega$ or $T_\text{max}$ too much causes **aliasing** (conceptually analagous to *Nyquist sampling*).
    This behavior is consistent with reported PINN failure modes due to undersampling ([Basir & Senocak, 2022](../references/references.md#basir2022pinnfailures)).

    - Insufficient point density will be unable to resulve the curvature 'resolution' that is required by the governing
      differential equations.
    - Neural networks naturally learn lower-frequency componenents first. High-frequency oscillations may require
      specialized architectures or adaptive sampling.
    
    ??? eigenote "__🗝️ Key Takeaways__"
        - A *low resolution **collocation density** breaks conservation* even if optimization converges.
        - Physics residual minimization does not guarantee physical invariants unless sampling resolves the solution
          spectrum. This is a manifestation of **spectral bias**.
        - Residual minimization approximates operator constraints, but conservation emerges from the generator structure.
          If the generator isn't structurally preserved (via sampling or architecture), invariants drift even under
          converged optimization. This connects spectral bias in neural nets to:
            - *Nyquist sampling theory*
            - *Hamiltonian structure*
            - *Conservation laws*
            - *PINN failure modes*

    > 🏡 **Take-Home Message**: In practice, collocation density should scale with both the simulation window and the
      highest frequency content expected in the solution.

!!! eigenote "__2. Constraint interference__"

    Increasing $T_\text{max}$ increases non-convexity, introduces more competing restraints, and creates saddle points 
    and narrow / unstable basins of attraction.

    - This manifests as gradually increasing 'spike amplitudes' in the training curve and reflects the
      optimizer being repeatedly redirected by global physics contraints (see Figure 1).
    - Ultimately prevents the model from converging into a stable basin.

!!! eigenote "__3. Soft constraints__"

    Unlike symplectic integrators, this model does *not* strictly conserve the Hamiltonian.

    - As $T_\text{max}$ increases, the overal domain grows and the trivial solution $(q_\theta \, , p_\theta)=(0,0)$
      increasingly dominates the loss landscape due to global satisfaction of physical constraints.
    - This behavior is expected in 'pure' physics-informed learning without data anchoring.

!!! eigenote "__4. Resampling trade-offs__"

    - **Static points:** Stable training, but the model might overfit constraint satisfaction at specific locations.
    - **Dynamic (resampled) points*: Better generalization across the whole domain, but introduces variance (i.e.,
      "noise") in the training curve.

!!! eigenote "__5. Extrapolation (OOD)__"

    - As a global function approximator trained on a bounded domain, the MLP primarily interpolates within the trianing
      domain ([Brunton & Kutz, 2022](../../references/reference.md#brunton2022datadriven)).
    - Consequently, performance degrades rapidly outside the training window $[0, 2\pi]$ unless periodic inductive
      biases are introduced.
