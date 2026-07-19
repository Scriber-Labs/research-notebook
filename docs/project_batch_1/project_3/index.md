# Project 3: Self-Consistent Discrete Hamiltonian Inference (SCF-Inspired Low-Fidelity PINN)

!!! warning "This project is still in the initial phases of development."

!!! eignote "Goal"

    Explore whether self-consistent field structure and weak physics contraints can recover meaningful Hamiltonian representations from noisy quantum observables.

!!! question "Questions That Need Answering"
        
    🧙‍♂️ Q1: Can we infer the parameters of an unknown quantum Hamiltonian from noisy observables using a self-consistent field (SCF)-inspired learning loop
    where the model alternates between:

    - Solving for quantum states given a Hamiltonian.
    - Updating the Hamiltonian from observed/estimated structure.

    This mirrors the fixed-point structure of Hartree-Fock / density functional theory (DFT) methods used in electronic 
    structure theory (e.g., implementations such as PySCF).

    ---

    🧙‍♂️ Q2: Can the neural network discover the parameterized generator of unitary flow that preserves symplectic structure?

!!! eigenote "Relation to Other Low-Fidelity PIML Projects"

    | Project | Description |
    | :------------- | :------------- |
    | **Project 1** | forward variational PINN (hamonic oscillator) | 
    | **Project 2** | inverse Schrödinger equation (semi-supervised learning) |
    | **Project 3** | inverse Hamiltonian inference with SCF and geometric regularization |

!!! eigenote "Model System: Discrete Qubit Hamiltonian"

    We consider a small transverse Ising-like Hamiltonian:

    $$ H^\theta = \sum_{i}{h_i\sigma_i^2} + \sum_{i<j}{J_{ij}\sigma_i^2\sigma_j^2} + \sum_{i}{g_i\sigma_i^2} $$

    Unkown Parameters:
    
    $$\theta = \{h_i, J_{ij}, g_i\}$$


!!! eigenote "Observables"

    We train on noisy estimates of:

    - energy levels
    - expectation values $\langle \sigma_i(t)\rangle$
    - correlation functions
    - short-time dynamics


!!! eigenote "SCF-Inspired Training Loop"

    Each iteration consists of:

    1. Forward solve $\implies$ diagonalization or time evolution of $H^\theta$
    2. Observation model $\implies$ compute noisy measurement statistics
    3. Hamiltonian update $\implies$ update parameters using mismatch between predicted and observed structure
    4. SCF regularization $\implies$ encourages convergence twoard a fixed Hamiltonian

!!! eignote "Loss Function"

    $$\mathcal{L}_\text{total} = \mathcal{L}_\text{data} + \lambda_1 \mathcal{L}_\text{phys} + \lambda_2 \mathcal{L}_\text{SCF} + \lambda_3 \mathcal{L}_\text{symplectic}$$

    where

    - **Data loss:** mismatch in observables
    - **Physics loss:** Schrödinger consistency
    - **SCF loss:** stabilization of Hamiltonian updates
    - **Symplectic loss (soft constraint):** encourages geometric consistency of phase-space-like trajectories

!!! eigenote "Connection to PySCF / DFT"

    Self-consistent field methods in electronic structure theory (e.g., PySCF) solve:

    - Hamiltonian depends on electron density
    - electron density depends on eigenstates of Hamiltonian

    This project mirrors that structure, but replaces:

    | **DFT concept** | **This project** |
    | :-------------- | :--------------- |
    | electron density | learned Hamiltonian parameters |
    | Fock operator | neural parameter update |
    | SCF loop | fixed-point Hamiltonian inference |

!!! eigenote "POD-Based Diagnostics (Post-Hoc Analysis)"

    As in Project 2, we apply *Proper Orthogonal Decomposition* (POD) as a purely diagnostic tool to:

    - the learned eigenstates $\psi_n^\theta$.
    - SCF iteration trajectories.
    - observable time series.

    POD reveals:

    - dominant spectral modes of learned quantum states.
    - low-rank structure of the inferred state manifold.
    - convergence behavior of SCF learning dynamics.


!!! eigenote "References"

    - PySCF documentation (SCF methods in quantum chemistry)
    - Hartree-Fock theory and density functional theory (DFT) literature
    - Physics-informed neural networks (Raissi et al., 2019)
    - Brunton & Kutz (data-driven scientific computing)

