# Conclusions

## Figure Analysis Conclusions
1. Figures 2, 3, 4, and 5 all together suggest accurate recovery of low-energy spectral information does not necessarily require accurate recovery of the underlying potential.
2. 

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
            - A1: Yes, noise in $\rho_n^\text{obs}$ can lead to "aliasing" where the model blends the model blends physical eigenstates to fit the noise.
            ---
            - Q2: Are certain eigenstates more stable under low-fidelity observation?
            - A2: Typically, lower-endergy (ground) states are more stable as they have simpler nodal structure and higher signal-to-noise ratios in many physical systems.

        ??? note "🔷 Structural Recovery"
            - Q1: Is curvature recoverable before amplitude?
            - A1: Curvature (the second derivative) is directly linked to the kinetic term in the TISE, making it a primary feature captured during training. Since this is obtained via discretization of the second derivative operator, it is particuarly susceptible to failure modes associated with ill-conditioning.
+           ---
            - Q2: Are nodal locations more identifiable than potential amplitude?
            - A2: Yes, nodal points in wavefunctions provide strong geometric constraints that are often more robust to amplitude scaling issues.

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
- Constant $\Delta x$ immplementations:
  - Dirichlet boundary conditions
  - Simpson's rule quadrature formula in place of the trapezoidal rule.
- Adaptive collocation.
- Symplectic loss term and other Hamiltonian-preserving regularizers.
- Learnable $\lambda$'s.
- Fourier features should increase the MLP's ability to capture high-frequency components.
  - SIREN activation layer.
  - SAFE-NET protocol from https://arxiv.org/html/2502.07209v2.