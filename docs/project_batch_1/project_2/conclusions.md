# Conclusions

!!! eigenote "__Figure Analysis Overview__"

    1. Figures 2, 3, 4, and 5 all together suggest accurate recovery of low-energy spectral information does not necessarily require accurate recovery of the underlying potential.

!!! favicon "__Take-Home Messages__"

    === "__🧙🏻‍♂️Questions that need answering__"

        ??? eigenote "__Identifiability__"
            
            - [ ] Q1: Which features of the ground truth potential $V_\theta(x)$ are uniquely recoverable?
            - [ ] Q2: Does smoothness regularization bias the recovered potential family?

            ??? eigenote "__Answers__"
            
                - A1: The overall shape (curvature) is generally recoverable where probability density $\rho(x)$ is high. Amplitude and DC offset may be biased by regularization.
                - A2: Yes, it penalizes high-frequency oscillations and tends to produce "flatter" potentials if the loss term weight $\lambda_\text{smooth}$ is too high, potentially missing sharp features.

        ??? eigenote "__Mode Structure__"
            
            - [ ] Q1: Does orthogonality emerge without reinforcement?
            - [ ] Q2: Does POD reveal effective low-rank eigenspaces?
            
            ??? eigenote "__Answers__"
                
                - A1: It can weakly emerge through the TISE coupling, but explicit orthonormalization or the energy ordering loss is usually required for stable convergence of multiple states.
                - A2: Yes, the singular value decay indicates the effective dimensionality of the learned wavefunction space.

        ??? eigenote "__Inverse Stability__"
           
            - [ ] Q1: Does noise induce mode mixing?
            - [ ] Q2: Are certain eigenstates more stable under low-fidelity observation?
           
            ??? eigenote "__Answers__"

                - A1: Yes, noise in $\rho_n^\text{obs}$ can lead to "aliasing" where the model blends the physical eigenstates to fit the noise.
                - A2: Typically, lower-energy states are more stable as they typically have simpler model structure and higher signal-to-noise ratios in many physical systems.

        ??? eigenote "__Structural Recovery__"

            - [ ] Q1: Is curvature recoverable before amplitude?
            - [ ] Q2: Are nodal locations more identifiable than potential amplitude?
           
            ??? eigenote "__Answers__"

                - A1: In this architecture, curvature (the second derivative) is an 'operator' that is a major component of the kinetic term of the TISE. Thus, the optimizer is highly sensitive to curvature since both the Schrödinger residual and the smoothness regularizer loss terms depend on second derivatives.  
                - A2: Based on the results in the figure analysis, nodal points corresponded with regions of the trained curves that were more aligned with the ground truth wavefunctions. This agrees with the intuition that nodes are more robust to potential fluctuations.

    === "__:ember: Lessons Learned__"

        !!! ember "__Reproducibility Sanity Check__"
        
               🏘️ Replicating results with a separate training loop helps reveal any bugs that are masked by expected results. 

        !!! ember "__Normalization Hygiene__"
         
            🧿️ Do NOT carelessly introduce normalization steps without keeping track. If you make the decision to double-normalize, have a justification and make a note of it.
 
            !!! eigenote "__Rule of Thumb__"
 
                👍 **Normalize the Domain, Constrain the Range**

            !!! eigenote "__Project 2 Normalization Steps__"
  
                | **Step** | **Method** | **Type** | **Justification** |
                | -------- | ---------- | -------- | ---------------- |
                | 1. Grid Setup | `make_grid` | Domain | Prevents "stiff" gradients originating from extreme input scales |
                | 2. Orthonormalization | `model.psi_theta` | Range | Gram-Schmidt + re-normalization; prevents mode collapse and ensures physical density. |
                | 3. Stability | $\epsilon=1e-8$ | Range | Prevents `NaN` during initialization |
                | 4. Sign Correction | Overlap check | Alignment | Resolves $\pm \psi_n^\theta(x)$ phase ambiguity for plotting |
                | 5. POD Scaling | $1/\sqrt{dx}$ | Alignment | Maps abstract SVD vectors to physical L2 norms |




# 🔮 Future Implementations
- Constant $\Delta x$ implementations:
  - Dirichlet boundary conditions
  - Simpson's rule quadrature formula in place of the trapezoidal rule.
- Adaptive collocation.
- Symplectic loss term and other Hamiltonian-preserving regularizers.
- Learnable $\lambda$'s.
- Fourier features should increase the MLP's ability to capture high-frequency components.
  - SIREN activation layer.
  - SAFE-NET protocol from https://arxiv.org/html/2502.07209v2.