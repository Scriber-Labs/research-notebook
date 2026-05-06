# Take Home Messages

1. Replicating your results with a separate training loop helps reveal any bugs that are masked by expected results. 
2. Don't carelessly introduce normalization steps without keeping track. If you make the decision to double-normalize, have a justification and make a note of it.


!!! tip "Rule of Thumb"
    
    **Normalize the Domain, Constrain the Range**


??? note "Project 2 Normalization Steps"

    | **Step** | **Method** | **Type** | **Justification** |
    | -------- | ---------- | -------- | ---------------- |
    | 1. Grid Setup | `make_grid` | Domain | Prevents "stiff" gradients originating from extreme input scales |
    | 2. Wavefunction Normalization | `NormalizedWavefunctionNet` | Range | Guarantees physical probability density = 1. |
    | 3. Orthonormality | Gram-Schmidt | Range | Prevents mode collapse; ensures unique eigenstates |
    | 4. Stability | $\epsilon=1e-8$ | Range | Prevents `NaN` during initialization |
    | 5. Sign Correction | Overlap check | Alignment | Resolves $\pm \psi_n^\theta(x)$ phase ambiguity for plotting |
    | 6. POD Scaling | $1/\sqrt{dx}$ | Alignment | Maps abstract SVD vectors to physical L2 norms |