# 🎭 Setting the Stage
## 🔰 Overview
- The PIML learns $N=3$ orthonormalized eigenfunctions $\hat{\psi}_n^\theta$ where $n=\{0, 1, ..., N-1\}$. 
- Eigenvalues $E_n^\theta$ are predicted for the energy eigenvalues. These are constrained to be ordered $E_0 < E_1 < E_2$.
- The neural network architecture $V_\theta : \mathbb{R} \rightarrow \mathbb{R}$ approximates the unknown potential $V_\theta(x)$.

## 📒 Core Terminology
- **Physics Residual**: Used in the loss function to ensure the learned wavefunctions and learned potential are physically consistent.
- **1-D TISE (Time-Independent Schrödinger Equation)**: The physical constraint $ \hat{H}\psi_n = E_n\psi_n $ where $$ \hat{H}=-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)$$ is used to define the physics residual for the inverse problem.
- **POD (Proper Orthogonal Decomposition)**: A data-driven method (equivalent to PCA) used to find the spatial features (modes) in the learned wavefunctions along which the variance in the data varies the most.
- **Identifiability**: The ability to uniquely determine the ground truth potential from observed densities $ \rho(x)_n^\text{obs}$ and energies $E_n^\text{obs}$.
- **Mode Mixing**: A failure state where a single learned wavefunction contains features from multiple true physical eigenstates.

## 📊 Summary Tables: 

### Table 1: Variable Relations

| **Variable**             | **Definition**                                                                                                                                                  | **Diagnostic Use**                                                                                                      |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| $\psi_n(x)$              | Analytic ground truth wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                    | A validation of model accuracy.                                                                                         |
| $\psi_n^\theta(x)$       | Learned wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                                  | Shows what the model "thinks" the analytic wavefunction looks like.                                                     |
| $\hat{\psi}_n^\theta(x)$ | Orthonormalized learned wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                  | Used to define the physics residual and perform POD diagnostics.                                                        |
| $U_k$ (POD modes)        | The SVD spatial basis. Specifically the $k$-th POD mode, which is the $k$-th eigenvector of the covariance matrix of the orthonormalized learned wavefunctions. | Reveals the effective dimensionality of the learned space.                                                              |
| $V_{nk}$ (Composition)   | Weights connecting the $n$-th true eigenstate to the $k$-th POD mode.                                                                                           | Used to quantify the contribution of each POD mode to the true eigenstate. Identifies mode mixing and alignment quality |

### Table 2: Matrix Description of $H_\theta$

| **Variable**                | **Definition**                                                                                                                    | **Description**                                                                                                                                                         |
|:----------------------------|:----------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $\hat{H}_\theta$            | $-\frac{1}{2}\partial_{xx}+V_\theta(x)$  | A continuous operator representing the learned Hamiltonian in the parameterized space. |
| $H_\theta$                  | $ -\frac{1}{2}D_{xx}+\text{diag}(V_\theta(x)) $                                                                        | The learned Hamiltonian matrix. Represents the learned Hamiltonian operator in the parameterized space. Used to compute the physics residual and assess model accuracy. |
| $[D_{xx}\psi^\theta_{n,i}]$ | $\frac{\hat{\psi}^\theta_{n,i-1} - 2\hat{\psi}^\theta_{n,i} + \hat{\psi}^\theta_{n,i+1}}{\Delta x^2} $                            | The central difference matrix. Used to approximate the second derivative in the Hamiltonian.                                                                            
| $\text{diag}(V_\theta(x))$  | a diagonal matrix where the $i$-th diagonal element is the NN-predicted potential $V_\theta(x_i)$. | Summing with the first term in $H_\theta$  gives is a discretized approximation of $\hat{H}_\theta$.                              |