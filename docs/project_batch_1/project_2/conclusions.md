# Conclusions

**Overall Conclusion**: The model successfully solves the inverse Schrödinger problem for a 1-D harmonic oscillator by finding a potential and set of energies that satisfy both physical constraints (TISE) and the observational data (densities and energies). However, the figure analyses reveal that while the observable consistency is high, operator uniqueness remains a challenge.

!!! abstract "__Take-Home Messages__"

    === "🧙🏻‍♂️Questions that need answering"

        ??? note "🔷 Identifiabililty"

            - Q1: Which features of the ground truth potential $V(x)$ are uniquely recoverable?
            - A1: The overall shape (curvature) is generally recoverable where probability density $rho(x)$ is high. Amplitude and DC offset may be biased by regularization.
                - [ ] Need to further elaborate!
            ---
            - Q2: Does smoothness regularization bias the recovered potential family?
            - A2: Yes, it penalizes high-frequency oscillations and tends to produce "flatter" potentials if the loss term weight $\lambda_\text{smooth}$ is too high, potentially missing sharp features.

        ??? note "🔷 Mode Structure"
            - Q1: Does orthogonality emerge without reinforcement?
            - A1: It can weakly emerge through the TISE coupling, but explicit orthonormalization or the energy ordering loss is usually required for stable convergence of multiple states.
            ---
            - Q2: Does POD reveal effective low-rank eigenspaces?
            - A2: Yes, the singular value decay indicates the effective dimensionality of the learned wavefunction space.

        ??? note "🔷 Inverse Stability"
            - Q1: Does noise induce mode mixing?
            - A1: 
            ---
            - Q2: Are certain eigenstates more stable under low-fidelity observation?

        ??? note "🔷 Structural Recovery"
            - Is curvature recoverable before amplitude?
            - Are nodal locations more identifiable than potential amplitude?


    === "🤯 Lessons Learned"

        !!! tip "Reproducibility Sanity Check"
        
            🏘️ Replicating results with a separate training loop helps reveal any bugs that are masked by expected results. 

        !!! tip "Normalization Hygiene"
        
            🏘️ Do NOT carelessly introduce normalization steps without keeping track. If you make the decision to double-normalize, have a justification and make a note of it.

            !!! note "Rule of Thumb"
                👍 **Normalize the Domain, Constrain the Range**

            ??? note "Project 2 Normalization Steps"

                | **Step** | **Method** | **Type** | **Justification** |
                | -------- | ---------- | -------- | ---------------- |
                | 1. Grid Setup | `make_grid` | Domain | Prevents "stiff" gradients originating from extreme input scales |
                | 2. Orthonormalization | `model.psi_theta` | Range | Gram-Schmidt + re-normalization; prevents mode collapse and ensures physical density. |
                | 3. Stability | $\epsilon=1e-8$ | Range | Prevents `NaN` during initialization |
                | 4. Sign Correction | Overlap check | Alignment | Resolves $\pm \psi_n^\theta(x)$ phase ambiguity for plotting |
                | 5. POD Scaling | $1/\sqrt{dx}$ | Alignment | Maps abstract SVD vectors to physical L2 norms |


# 🔮 Future Implementations
- Simpson's rule quadrature formula in place of the trapezoidal rule.
- Symplectic loss term.
- SAFE-NET protocol from https://arxiv.org/html/2502.07209v2