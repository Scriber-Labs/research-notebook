# Loss Function

## Mathematical Formulation
## Four Loss Terms

1. **Schrödinger residual (physics loss)**

    $$ \mathcal{L}_\text{TISE} = \sum_{n=1}^N { \left| \hat{H}_\theta\psi_\theta^n(x)-E_n^\theta\psi_n^\theta(x) \right|^2 } $$

2. **Scale-aware smoothness**

    $$ \mathcal{L}_\text{smooth} = \Big< \frac{\left\| V_\theta''(x)  \right\|^2}{\epsilon+\left\| V_\theta(x) \right\|^2}  \Big> $$

3. **Data mismatch (noisy observables)**
   
    $$ \mathcal{L}_\text{data} = \frac{1}N\sum_{n=1}^N{\big(E_n^\theta-E_n^\text{obs}\big)^2} + \frac{1}N\sum_{n=1}^{N}\frac{1}{M}\sum_{j=1}^M{\Big( |\psi_{n}^\theta(x_j)|^2-\rho_n^\text{obs}(x_j)\Big) ^2} $$

4. **Energy ordering**
   
    $$ \mathcal{L}_\text{order} = \frac{1}{N-1}\sum_{n=0}^{N-2}{\bigg[\max{\big(0, E_n^\theta - E_{n+1}^\theta\big)} \bigg]^2} $$

## Total Loss
$$ \mathcal{L}_\text{tot} = \lambda_1 \mathcal{L}_\text{TISE} + \lambda_2 \mathcal{L}_\text{smooth} + \lambda_3 \mathcal{L}_\text{data} + \lambda_4 \mathcal{L}_\text{order} $$

## Description of Terms
??? tip "Loss Table"
    
    | **Loss Term**                              | **Soft vs. Hard** | **Classification** | **Notes** | 🐍 **Script** | 🐍 **Relevant Definitions**   |
    |--------------------------------------------|-------------------| ------------------ | --------- |---------------|-------------------------------|
    | 💙 1. **Schrödinger residual (physics loss)** | Soft              | Physics / consistency loss | Enforces the TISE | `physics.py` | `tise_residual()`, `tise_loss()` |
    | 💚 2. **Scale-aware smoothness**              | Soft              | Regularizer / prior | Penalizes curvature in $V_\theta(x)$. Encourages smoother, physically plausible potentials and stabilizes the inverse problem. | `physics.py` | `potential_smoothness_loss()` |
    | 🩷 3. **Data mismatch (observables)**         | Soft              | Supervised data-fit loss | Matches learned energies and densities to noisy observed measurements. | `inverse.py` | `data_mismatch_loss()` |
    | 🩵 4. **Energy ordering**                     | Soft              | Ordering penalty / constraint | Encourages $E_0 < E_1 < \cdots$. Helps prevent state swapping and preserves consistent mode indexing. | `physics.py` | `energy_ordering_loss()` |
    | 💜 **Total loss**                          | Soft              | Composite objective | Weighted sum of the active terms. Static scalar weights are used. | `train.py` | `train_step()` |

