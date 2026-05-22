# Project 2: Low-Fidelity Inverse Schrödinger Problem

!!! abstract "__Overview__"

    === "🥅 Goal"

        The purpose of project 2 is to study which spectral and geometric operator features remain identifiable under low-fidelity discretization, noisy observations, and constrained Hilbert-space geometry in the inverse Schrödinger problem.
        
        
    === "5️⃣ 5 Brunton Steps"

        | **Step** | **Description** | **Completed?** |
        |----------|-----------------|----------------|
        | 1. **Problem formulation** | Can a physics-informed neural network recover the unknown potential $V(x)$ along with the corresponding eigenfunctions from only noisy spectral data and probability-density snapshots? | ✔️ |
        | 2. **Data collection & curation** | - Uniform collocation grid of spatial points $x\in [-5,5]. <br/> - Noisy energy and probability density observations. | ✔️ |
        | 3. **Neural architecture**        | Coupled operator architecture with weighted wavefunction normalization, sequential Gram-Schmidt orthogonalization, and shared-potential eigenstate constraints | ⚠️ Both neural networks are scalar-in, scalar-out, fully differentiable, and deliberately kept shallow to preserve interpretability. |
        | 4. **Loss function**              | Composite loss with physics, smoothness, ordering, and data-consistency terms defined over a weighted discrete Hilbert-space geometry. | ✔️ |
        | 5. **Optimization**               | - Adam optimizer with a fixed learning rate. <br/> - Forward pass training loop that computes loss terms and uses backpropagation to update $V_\theta$ and $\psi_n^\theta$. | ❌⚠️ As in project 1, the optimizer is intentionally vanilla; the aim is to expose how the physics prior interacts with noisy data, not to chase maximal performance |

    === "♾️ Note on Ill-posedness"
            
        The inverse Schrödinger problem is a challenging task due to the ill-posed nature of the underlying differential equation and the presence of noise observations. 
        
        In particular, the inverse mapping is fundamentally non-unique: multiple potentials may reproduce similar spectral measurements and probability-density observations.
        
        Consequently, this project emphasizes interpretability and structural consistency rather than exact reconstruction fidelity.


    === "🌍 Global Design Choices"

        - Wavefunction normalization and orthogonalization are performed using trapezoidal quadrature weights, inducing a discrete approximation to the continuous Hilber-space inner product.
        - Proper orthogonal decomposition (POD) is treated as a diagnostic probe of learned basis geometry.



??? info "Conceptual Description of What the Model is Learning"
    
    !!! note "What the ML model parameterizes"

        The neural architecture jointly parameterizes:

        $$
        V_\theta(x), \qquad
        \psi_n^\theta(x), \qquad
        E_n^\theta
        $$

        using lightweight differentiable neural networks.


    !!! warning "The wavefunctions are not freely learned fields."

        The learned eigenstates are constrained by multiple coupled structures:

        - the time-independent Schrödinger equation (TISE),
        - weighted $L^2$ normalization,
        - sequential Gram-Schmidt orthogonalization,
        - and shared dependence on the learned potential $V_\theta$.

        Consequently, the architecture behaves as a **constrained operator-eigenfunction system** rather than an unconstrained function approximator.

    !!! note "Each optimization step updates a coupled quantum system."

        Each epoch updates the shared parameters governing:

        $$
        \{V_\theta, \psi_n^\theta, E_n^\theta\}
        $$

        via minimization of the composite physics-informed loss functional.

??? tip "🗝️ Key Points"

    - **Indirect supervision:** Project 2 architecture resembles a *coupled operator-eigenfunction learning system*.
    - **Proper orthogonal decomposition (POD)** is used as a geometry-aware diagnostic tool for analyzing basis conditioning, variance structure, and mode coupling in the learned eigenstate manifold.