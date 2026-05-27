# Conclusions

!!! abstract "__Take-Home Messages__"

    === "📈 Results"


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
- Implement symplectic loss term.
- Implement SAFE-NET protocol from https://arxiv.org/html/2502.07209v2