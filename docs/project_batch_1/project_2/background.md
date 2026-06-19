# 🎭 Background

The inverse Schrödinger problem is a fundamental problem in quantum mechanics that uses partial observations to determine the potential $V(x)$ that generates a given set of eigenfunctions and eigenvalues satisfying the Schrödinger equation. Unlike the forward problem, where the potential is known and eigenstates are computed, this inverse problem is generally non-unique and highly sensitive to measurement noise.

Project 2 investigates this setting for the 1-D time-independent Schrödinger equation (TISE) of a harmonic oscillator using a physics-informed neural architecture. In particular, this architecture jointly learns a potential and its associated first three eigenstates while enforcing physical consistency through the TISE.  

## 🔰 Overview

- The PIML learns $N=3$ orthonormalized eigenfunctions $\hat{\psi}_n^\theta$ where $n=\{0, 1, ..., N-1\}$. 
- Eigenvalues $E_n^\theta$ are predicted for the energy eigenvalues. These are constrained to be ordered $E_0 < E_1 < E_2$.
- The neural network architecture $V_\theta : \mathbb{R} \rightarrow \mathbb{R}$ approximates the unknown potential $V_\theta(x)$.

## 📒 Core Terminology
- **Identifiability**: The extent to which information contained in the observed densities and energies constrains the underlying learned potential.
  - Perfect identifiabillity corresponds to unique recovery, while poor identifiability permits multiple distinct potentials to explain the same observations.
- **Physics Residual**: Used in the loss function to ensure the learned wavefunctions and learned potential are physically consistent.
- **1-D TISE (Time-Independent Schrödinger Equation)**: The physical constraint $ \hat{H}\psi_n = E_n\psi_n $ where $$ \hat{H}=-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)$$ is used to define the physics residual for the inverse problem.
- **POD (Proper Orthogonal Decomposition)**: A data-driven method (equivalent to PCA) used to find the spatial features (modes) in the learned wavefunctions along which the variance in the data varies the most.
- **Mode Mixing**: A failure mode in which a learned basis state contains contributions from multiple physical eigenstates, reducing interpretability and obscuring state-to-state correspondence.

## 📊 Summary Tables: 

### Table 1: Variable Relations

| **Variable**             | **Definition**                                                                                                                                                  | **Diagnostic Use**                                                                                                      |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| $\psi_n(x)$              | Analytic ground truth wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                    | A validation of model accuracy.                                                                                         |
| $\psi_n^\theta(x)$       | Learned wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                                  | Represents the model's learned approximation of the corresponding physical eigenstate.                                  |
| $\hat{\psi}_n^\theta(x)$ | Orthonormalized learned wavefunction for the $n$-th eigenstate of the 1-D TISE                                                                                  | Used to define the physics residual and perform POD diagnostics.                                                        |
| $U_k$ (POD modes)        | The SVD spatial basis. Specifically the $k$-th POD mode, which is the $k$-th eigenvector of the covariance matrix of the orthonormalized learned wavefunctions. | Reveals the dominant geometric directions of variance within the learned eigenstate manifold.                           |
| $V_{nk}$ (Composition)   | Weights connecting the $n$-th true eigenstate to the $k$-th POD mode.                                                                                           | Used to quantify the contribution of each POD mode to the true eigenstate. Identifies mode mixing and alignment quality |

### Table 2: Matrix Description of $H_\theta$

The Schrödinger operator appears in both continuous and discretized forms throughout Project 2. The following table summarizes the relationship between the continuous Hamiltonian and its finite-difference approximation.

| **Variable**                | **Definition**                                                                                                                    | **Description**                                                                                                                                                                                          |
|:----------------------------|:----------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $\hat{H}_\theta$            | $-\frac{1}{2}\partial_{xx}+V_\theta(x)$  | A continuous operator representing the learned Hamiltonian in the parameterized space.                                                                                                                   |
| $H_\theta$                  | $ -\frac{1}{2}D_{xx}+\text{diag}(V_\theta(x)) $                                                                        | The learned Hamiltonian matrix. Represents the discretized learned Hamiltonian operator on the spatial collocation grid. </br> <br/>**Note:** Used to compute the physics residual and assess model accuracy. |
| $[D_{xx}\psi^\theta_{n,i}]$ | $\frac{\hat{\psi}^\theta_{n,i-1} - 2\hat{\psi}^\theta_{n,i} + \hat{\psi}^\theta_{n,i+1}}{\Delta x^2} $                            | The central difference matrix. Used to approximate the second derivative in the Hamiltonian.                                                                                                             
| $\text{diag}(V_\theta(x))$  | a diagonal matrix where the $i$-th diagonal element is the NN-predicted potential $V_\theta(x_i)$. | Summing with the first term in $H_\theta$  gives is a discretized approximation of $\hat{H}_\theta$.                                                                                                     |