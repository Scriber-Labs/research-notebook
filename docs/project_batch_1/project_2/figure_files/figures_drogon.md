# 🐉 Figure Analysis (Windows)
## 📚 Core Terminology
- **TISE (Time-Independent Schrödinger Equation)**: The physical constraint $H\psi = E\psi$ that ensures the learned wavefunctions and potential are physically consistent.
- **POD (Proper Orthogonal Decomposition)**: A data-driven method (equivalent to PCA) used to find the most "important" spatial features (modes) in the learned wavefunctions.
- **Identifiability**: The ability to uniquely determine the potential $V(x)$ from the observed densities $|\psi(x)|^2$.
- **Spectral Bias**: The tendency of neural networks to learn low-frequency (smooth) features before high-frequency (sharp) ones.
- **Mode Mixing**: A failure state where a single learned wavefunction $\hat{\psi}_n$ contains features from multiple true physical eigenstates.

## 📊 Summary Tables
### Table 1: Loss Components vs. Physical Role
| Loss Component | Mathematical Form | Physical/Regularization Role |
| :--- | :--- | :--- |
| **Data Mismatch** | $\sum \| \hat{\psi}_n^2 - \rho_n^{obs} \|^2$ | Anchors the model to experimental observations. |
| **TISE Residual** | $\sum \| H_\theta \hat{\psi}_n - E_n \hat{\psi}_n \|^2$ | Enforces physical law (Schrödinger Equation). |
| **Energy Ordering** | $\sum \text{ReLU}(E_n - E_{n+1} + \delta)$ | Prevents state-swapping and ensures $E_0 < E_1 < E_2$. |
| **Smoothness** | $\int \frac{\|V''\|^2}{\epsilon + \|V\|^2} dx$ | Penalizes non-physical oscillations in the potential. |

### Table 2: Entity Relationships
| Entity | Definition | Diagnostic Use |
| :--- | :--- | :--- |
| **$\psi_{true}$** | Analytic Ground Truth | Final validation of model accuracy. |
| **$\hat{\psi}_n^\theta$** | NN-Learned Wavefunctions | Shows what the model "thinks" the states look like. |
| **$U_k$ (POD Modes)** | SVD Spatial Basis of $\hat{\psi}_n^\theta$ | Reveals the effective dimensionality of the learned space. |
| **$V_{nk}$ (Composition)** | Weights connecting $U_k$ to $\hat{\psi}_n^\theta$ | Identifies mode mixing and alignment quality. |

## 🧙‍♂️ Questions That Need Answering
### 🔷 Identifiability
- [x] Which features of $V(x)$ are uniquely recoverable?
    - The overall shape (curvature) is generally recoverable where the probability density $\rho(x)$ is high. Amplitude and DC offset may be biased by regularization.
- [x] Does smoothness regularization bias the recovered potential family?
    - Yes, it penalizes high-frequency oscillations and tends to produce "flatter" potentials if the weight $\lambda_{smooth}$ is too high, potentially missing sharp features.
### 🔷 Mode Structure
- [x] Does orthogonality emerge without reinforcement?
    - It can emerge weakly through the TISE coupling, but explicit orthonormalization or the energy ordering loss is usually required for stable convergence of multiple states.
- [x] Does POD reveal effective low-rank eigenspaces?
    - Yes, the singular value decay indicates the effective dimensionality of the learned wavefunction space.
### 🔷 Inverse Stability
- [x] Does noise induce mode mixing?
    - Yes, noise in $\rho_{obs}$ can lead to "aliasing" where the model blends physical eigenstates to fit the noise.
- [x] Are certain eigenstates more stable under low-fidelity observation?
    - Typically, lower-energy (ground) states are more stable as they have simpler nodal structures and higher signal-to-noise ratios in many physical systems.
### 🔷 Structural Recovery
- [x] Is curvature recoverable before amplitude?
    - Curvature (the second derivative) is directly linked to the kinetic term in the TISE, making it a primary feature captured during training.
- [x] Are nodal locations more identifiable than potential amplitude?
    - Yes, nodal points in wavefunctions provide strong geometric constraints that are often more robust to amplitude scaling issues.

### 🧿  Numerical Methods
- [x] Is the following matrix description of $H_\theta$ consistent with the figures generated in demo.ipynb and cli scripts?

    $$ H_\theta = -\frac{1}{2} D_{xx} + \text{diag}(V_\theta(x)) \, ✅$$

  - [x] If is is accurate, can you write out the expressoins for $D_{xx}$ and $\text{diag}(V_\theta(x))$ ?
    - $D_{xx}$ is the central finite difference matrix: $[D_{xx} \psi]_i = \frac{\psi_{i+1} - 2\psi_i + \psi_{i-1}}{\Delta x^2}$.
    - $\text{diag}(V_\theta(x))$ is a diagonal matrix where the $i$-th diagonal element is the NN-predicted potential $V_\theta(x_i)$.
  - [x] Please refer the @assets/mermaid-diagrms/architecture_final.mmd ?
    - The architecture shows the NN outputting $V_\theta$ and $E_\theta$, which are then fed into the TISE residual block using the discrete Hamiltonian above.
- [x] Where is the best figure to mention ill-conditioning?
    - **Figure 6 (POD Singular Values)** is best; a slow decay or near-zero singular values for required modes indicates ill-conditioning in the basis representation.

--

## 🎭 **Setting the Stage:**
- The PIML learns $N=3$ orthonormalized eigenfunctions $\hat{\psi}_n^\theta$ where $n\in\{0,1,\dots,N-1\}$.
- Learned $E_n^\theta$: The model predicts scalar values for the energy eigenvalues, which are constrained to be ordered $E_0 < E_1 < E_2$.
- $V_\theta(x)$: A neural network $V_\theta: \mathbb{R} \to \mathbb{R}$ that approximates the unknown potential.

## Figure 1
![training_curves](demo_visuals/training_curves.png)
> 🏡**Take-Home Message:** 
> The model successfully minimizes the total loss by balancing data fidelity with physical consistency (TISE) and smoothness constraints.
>
> 🔑 **Key Ideas:**
> 1. The physics residual $R_n = H_\theta \psi_n^\theta -E_n^\theta\psi_n^\theta $ where $$ H_\theta \hat{\psi}_n^\theta \approx E_n^\theta \hat{\psi}_n^\theta $$ gives $$\mathcal{L}_\text{TISE} = \sum_{n=0}^{N-1}\| R_n(x_j)  \|^2$$
> 2. $\mathcal{L}_\text{order} = \sum_{n=0}^{N-2} \text{ReLU}(E_n - E_{n+1} + \delta)$ enforces strict energy ordering.
> 3. The smoothness term $$ \mathcal{L}_\text{smooth} = \Bigg\langle\frac{\|V_\theta''(x_j) \|^2}{\epsilon + \| V_\theta(x_j) \|^2}\Bigg\rangle $$
> 4. The data mismatch term (pink curve) is pointwise supervised $\Rightarrow$ $\mathcal{L}_\text{data}$ directly supervises $\rho_n^\text{obs}$ and $E_n^\theta$:
>    
>    $$ \mathcal{L}_\text{data} = \frac{1}{N}\sum_{n=0}^{N-1}{\Big(E_n^\theta - E_n^\text{obs}\Big)^2}+\frac{1}{N}\sum_{n=0}^{N-1}{\frac{1}{M}\sum_{j=1}^{M}\Big(|\hat{\psi}_n^\theta(x_j)|^2-\rho_n^\text{obs}(x_j)\Big)^2} $$
>    
>    where $N$ is the number of learned eigenfunctions and the

> ❌**Failure Modes:**
> - High final loss: Optimization stalled in a local minimum.
> - Oscillation: Unbalanced loss weights causing the optimizer to "ping-pong" between physics and data.

## Figure 2
![learned_potential](demo_visuals/learned_potential.png)
> 🏡**Take-Home Message:** 
> The recovered potential $V_\theta(x)$ matches the ground truth harmonic oscillator shape, though some bias may exist at the boundaries where data is sparse.

> 🔑 **Key Ideas:**
> - Symmetry of the potential is recovered without being explicitly programmed.
> - Smoothness prior prevents overfitting to noise in the observed densities.

> ❌**Failure Modes:**
> - Potential "flattening": High smoothness weight washing out physical potential wells.
> - Boundary artifacts: Unconstrained potential at the edges of the grid where wavefunction amplitude is zero.

---
## Figure 3
![learned_wavefunctions](demo_visuals/learned_wavefunctions.png)
> 🏡**Take-Home Message:** 
> The learned eigenfunctions $\hat{\psi}_n^\theta$ capture the correct nodal structure (0, 1, 2 nodes) corresponding to the first three states of a harmonic oscillator.

> 🔑 **Key Ideas:**
> - Phase alignment: The wavefunctions match the ground truth up to a global sign.
> - Orthogonality: The states maintain distinct spatial distributions.

> ❌**Failure Modes:**
> - State swapping: Higher-order modes capturing ground-state features.
> - Nodal displacement: Incorrect potential curvature shifting the zero-crossings of the wavefunctions.

---
## Figure 4
![learned_energies](demo_visuals/learned_energies.png)
> 🏡**Take-Home Message:** 
> The learned energy spectrum $\{E_n^\theta\}$ matches the observed values and closely follows the theoretical $E_n = n + 0.5$ spacing.

> 🔑 **Key Ideas:**
> - $\mathcal{L}_{ordered}$ prevents state-swapping during early training.
> - The model generalizes from noisy energy observations to a consistent spectrum.

> ❌**Failure Modes:**
> - Collapsed spectrum: All energies converging to the same value (prevented by $\mathcal{L}_{ordered}$).
> - DC Offset: Energies shifted by a constant, coupled with a vertical shift in $V(x)$.

---
## Figure 5
![density](demo_visuals/density.png)
> 🏡**Take-Home Message:** 
> The learned densities $|\hat{\psi}_n^\theta(x)|^2$ accurately reconstruct the observed probability distributions while filtering out noise.

> 🔑 **Key Ideas:**
> - Data Anchoring: $\mathcal{L}_{data}$ provides the primary spatial constraint for the model.
> - Phase Invariance: Since density is $\psi^2$, the sign of $\psi$ is unconstrained by data alone.

> ❌**Failure Modes:**
> - Overfitting noise: The model fitting the high-frequency wiggles in the observed density instead of the physical shape.

---
## Figure 6
![pod_singular_values](demo_visuals/pod_singular_values.png)
> 🏡**Take-Home Message:** 
> The POD spectrum shows how many independent "modes" are present in the learned wavefunction ensemble. 3 dominant values indicate a rank-3 subspace.

> 🔑 **Key Ideas:**
> - Singular Value Decay: A sharp drop after $N=3$ indicates the model has effectively captured the target dimensionality.
> - Noise Floor: Small but non-zero singular values represent residual noise or model complexity.

> ❌**Failure Modes:**
> - Degenerate singular values: Multiple modes having the same importance, indicating physical symmetry or model under-parameterization.
> - Slow decay: Basis is not compact; model is capturing too much noise.

---
## Figure 7
![pod_modes](demo_visuals/pod_modes.png)
> 🏡**Take-Home Message:** 
> POD spatial modes $U_k$ identify the most significant spatial features across all learned wavefunctions.

> 🔑 **Key Ideas:**
> - Spatial Basis: POD modes provide an optimized basis for representing the learned states.
> - Feature Extraction: The first mode usually corresponds to the most common feature (e.g., the ground state peak).

> ❌**Failure Modes:**
> - Non-physical modes: POD modes that don't look like any possible eigenfunction (e.g., highly asymmetric).

---
## Figure 8
![overlap_heatmap](demo_visuals/overlap_heatmap.png)
> 🏡**Take-Home Message:** 
> Identity matrix tells us $\hat\psi_n^\theta$ were successfully orthonormalized.

> 🔑 **Key Ideas:**
> - **Self-Orthogonality**: Since the NN outputs are explicitly orthonormalized in this architecture, this figure serves as a verification of the numerical implementation.
> - **Coupling**: Even if states are orthogonal, they remain coupled through the shared potential $V_\theta(x)$ and the TISE loss.

> ❌**Failure Modes:**
> - Non-identity diagonals: Indicates numerical error in the normalization layer or integration.
> - Significant off-diagonals: Loss of orthogonality, likely due to optimization failure or conflicting gradients.

---
## Figure 9
![cross_overlap_heatmap](demo_visuals/cross_overlap_heatmap.png)
> 🏡**Take-Home Message:** 
> Shows the projection of learned wavefunctions onto the POD basis, revealing how states are mixed.

> 🔑 **Key Ideas:**
> - **Modal Mixing**: Off-diagonal elements indicate that a learned state is a combination of multiple POD modes.
> - **Basis Quality**: A diagonal-heavy matrix means the POD basis is well-aligned with individual physical states.

> ❌**Failure Modes:**
> - Sparse/Random Heatmap: Indicates that the POD basis and learned states are completely unaligned, suggesting the model has not converged to a physical eigenbasis.

---
## Figure 10
![pod_temporal_modes](demo_visuals/pod_temporal_modes.png)
> 🏡**Take-Home Message:** 
> The temporal/composition coefficients show how each learned wavefunction $\hat{\psi}_n^\theta$ is constructed from the POD spatial modes.

> 📒 **Terminology**
> 
> - **'temporal' modes** $V_k$
>     - ⚠️ Note 'temporal' is a legacy term from fluid dynamics POD (where snapshots are taken in time). Here, it refers to the **composition** or **coefficient** space across the $N$ learned states.
>     - **Recommended replacement**: "Compositional Coefficients" or "State-Weight Vectors".

> 🔑 **Key Ideas:**
> - **Coefficient Vectors**: Each row of the heatmap represents the vector of weights $[V_{n1}, V_{n2}, \dots]$ used to build $\hat{\psi}_n$ from POD modes.
> - **Dominance**: A single bright spot in a row means the learned state is almost entirely composed of one POD mode.

> ❌**Failure Modes:**
> - All states using the same POD mode: Rank collapse.
> - Uniformly low weights: Energy spread too thin across noise modes.

---
## Figure 11
![pod_temporal_overlap](demo_visuals/pod_temporal_overlap.png)
> 🏡**Take-Home Message:** 
> Verifies the orthogonality of the POD coefficients $V_k$, which should form an identity matrix by definition of the SVD.

> 🔑 **Key Ideas:**
> - **Mathematical Consistency**: $V^T V = I$ is a mathematical property of the SVD. If this is not an identity matrix, the SVD was performed incorrectly or on non-standardized data.

> ❌**Failure Modes:**
> - Blurred Identity: Numerical precision issues or invalid SVD implementation.

---
## Figure 12
![pod_temporal_cross_overlap](demo_visuals/pod_temporal_cross_overlap.png)
> 🏡**Take-Home Message:** 
> Visualizes the relationship between the coefficient vectors, highlighting any unwanted correlations or state-mixing.

> 🔑 **Key Ideas:**
> - **Cross-Correlation**: Shows if different learned states are picking up the same underlying "noise" or "features" from the POD basis.

> ❌**Failure Modes:**
> - Strong correlations between supposedly different states: Suggests the model is struggling to distinguish between higher-order eigenfunctions.
> 

---
## 💚 Junie-generated feedback:
Based on the 12 diagnostic figures generated from demo.ipynb and analyzed in figures_drogon.md, here is a synthesized interpretation of the results.

🌟 High-Level Interpretation: Success with Identifiability Caveats
The model successfully solves the inverse Schrödinger problem for a 1-D harmonic oscillator by finding a potential 
 and set of energies 
 that satisfy both the physical constraints (TISE) and the observational data (densities). However, the diagnostics reveal that while the observable consistency is high, operator uniqueness remains a challenge.

📉 1. Training & Global Convergence (Figures 1, 4, 5)
Rapid Anchoring: The "Data Mismatch" loss (Fig 1) drops faster than the physics residual. This indicates the model "memorizes" the observed densities 
 before it fully understands the underlying physics 
.
Spectral Accuracy: Figure 4 shows the learned energies 
 align well with the ground truth 
. This confirms that the energy ordering loss successfully prevented "state swapping" during early training.
Noise Filtering: The model acts as a physical regularizer; the learned densities (Fig 5) are smoother than the noisy observations, essentially "denoising" the data using the Schrödinger equation as a prior.
🏗️ 2. Potential Recovery & Identifiability (Figure 2)
Local Fidelity: The potential 
 accurately recovers the quadratic curvature near the center (where the wavefunctions have high amplitude).
The "Shadow" Problem: At the boundaries (Fig 2), the potential often flattens or drifts. This is a fundamental limit of identifiability: if the particle never "visits" the edges (zero probability density), the model has no data to supervise the potential there.
Smoothness Bias: The smoothness regularization ensures the potential doesn't wiggle to fit noise, but it can also "round off" sharp physical features if the weight is too high.
🎭 3. Wavefunction & Mode Structure (Figures 3, 8)
Nodal Integrity: The wavefunctions (Fig 3) capture the correct number of nodes (0, 1, 2). This is a strong indicator of physical success.
Phase Invariance: You'll notice the wavefunctions might be flipped (sign change) relative to ground truth. This is expected since 
 is the only thing supervised by data.
🔍 4. POD Diagnostics: The "Hidden" Quality (Figures 6-12)
The POD (Proper Orthogonal Decomposition) analysis is the most critical for judging if the model is "cheating."

Rank-3 Confirmation: Figure 6 shows exactly 3 dominant singular values. This is great—it means the model hasn't "collapsed" into a single mode and isn't wasting capacity on random noise.
Mode Mixing (The Danger Zone): Figure 9 (Cross-Overlap) shows how well individual learned states 
 align with the "ideal" POD basis. If you see strong off-diagonal elements, it means the model is struggling to separate the states (e.g., State 1 might be "contaminated" with features from State 2).
Orthonormalization Verification: Figure 8 and 11 confirm that your mathematical implementation of the Hilbert space constraints is working perfectly (Identity matrix = success).
🚩 What to Watch Out For (Failure Modes)
If you rerun the experiment with more noise or different weights, look for these "Red Flags":

Rank Collapse: If Figure 6 shows only 1 big singular value, all your states have merged into one.
Potential Flattening: If Figure 2 shows a flat line, your lambda_smooth is too high, washing out the physics.
Blurred Identity: If Figure 8 (Overlap) is not a clean identity matrix, the wavefunctions are losing their orthogonality, and the physical interpretation of "separate energy levels" breaks down.
🎓 Summary Table for Learning
Metric	"Good" Result	"Bad" Result	Meaning
Singular Values (Fig 6)	Sharp drop after N=3	Slow, gradual decay	Model captured the right dimensionality.
Potential (Fig 2)	Quadratic/Curved	Flat or Spiky	Identifiability of the operator.
Overlap Heatmap (Fig 8)	Clean Identity	Blurred/Off-diagonals	Numerical health of the eigenbasis.
Composition (Fig 10)	One dot per row	Multiple dots per row	Clean separation vs. Mode Mixing. 