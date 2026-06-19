# Project 2: Low-Fidelity Inverse Schrödinger Problem ⚛️

!!! abstract "__Overview__"

    === "🥅 Goal"

        - Study which structural featrues of an unknown Hamiltonian remain identifiable under low-fidelity discretization, noisy observations, and constrained Hilbert-space geometry in the inverse Schrödinger problem.
        - It is NOT to obtain a perfect reconstruction of the ground truth potential $V(x)$.

    === "🗝️ Key Points"

        - **Indirect supervision:** Project 2 architecture resembles a *coupled operator-eigenfunction learning system*.
        - **Proper orthogonal decomposition (POD)** is used as a geometry-aware diagnostic framework for analyzing basis conditioning, variance concentration, mode alignment, and ⁉️potential mode mixing⁉️ withinin the learned eigenstate manifold.
        
    === "5️⃣ 5 Brunton Steps"

        | **Step** | **Description** | **Completed?** |
        |----------|-----------------|----------------|
        | 1. **Problem formulation** | Can a physics-informed neural network recover the unknown potential $V(x)$ along with the corresponding eigenfunctions from only noisy spectral data and probability-density snapshots? | ✔️ |
        | 2. **Data collection & curation** | - Uniform collocation grid of spatial points $x\in [-5,5]. <br/> - Noisy energy and probability density observations. | ✔️ |
        | 3. **Neural architecture**        | Coupled operator architecture with weighted wavefunction normalization, sequential Gram-Schmidt orthogonalization, and shared-potential eigenstate constraints | ⚠️ Both neural networks are scalar-in, scalar-out, fully differentiable, and deliberately kept shallow to preserve interpretability. |
        | 4. **Loss function**              | Composite loss with physics, smoothness, ordering, and data-consistency terms defined over a weighted discrete Hilbert-space geometry. | ✔️ |
        | 5. **Optimization**               | - Adam optimizer with a fixed learning rate. <br/> - Forward pass training loop that computes loss terms and uses backpropagation to update $V_\theta$ and $\psi_n^\theta$. | ❌⚠️ As in project 1, the optimizer is intentionally vanilla; the aim is to expose how the physics prior interacts with noisy data, not to chase maximal performance |

    === "🌍 Global Design Choices"   

        - A central difference stencil is used to approximate the $\partial_{xx}$ operator.
        - Proper orthogonal decomposition (POD) is treated as a diagnostic probe of learned basis geometry.
        - In the training loop, orthonormalization (via Gram-Schmidt and l2 inner product with trapezoidal weighting) is performed before the loss function is calculated. Consequently, the physics residual is evaluated using orthonormalized eigenfunctions, giving a learned Hamiltonian system $$H_\theta \hat{\psi}_n^\theta \approx E_n^\theta \hat{\psi}_n^\theta \, , $$ whose deviation from the eigenvalue equation is minimized during training. ✨
            - Sequential Gram-Schmidt orthogonalization ensures learned orthogonal wavefunctions are orthgonal and consistent with the requirement that Hamiltonian eigenfunction be orthgonal.
            - Since the system is trained on a uniform grid, we implement the Trapezoidal Rule to provide a discrete approximation of the continuous Hilbert-space inner product.
            - Consistent use of the Trapezoidal Rule throughout the l2 inner product steps and POD weighting ensures consistency in normalization between the learned wavefunctions in the training loop and the POD analysis.



??? info "Conceptual Description of What the Model is Learning $\mathcal{L}$"
    
    !!! eigenote "What the ML model parameterizes"

        The neural architecture jointly parameterizes:

        $$
        V_\theta(x), \qquad
        \psi_n^\theta(x), \qquad
        E_n^\theta
        $$

        using lightweight differentiable neural networks.


    !!! ember "The wavefunctions are not freely learned fields."

        The learned eigenstates are constrained by multiple coupled structures:

        - the time-independent Schrödinger equation (TISE),
        - weighted $L^2$ normalization,
        - sequential Gram-Schmidt orthogonalization,
        - and shared dependence on the learned potential $V_\theta$.

        Consequently, the architecture behaves as a **constrained operator-eigenfunction system** rather than an unconstrained function approximator.


??? eigenote "♾️ Note on Ill-posedness"
            
    The inverse Schrödinger problem is a challenging task due to the ill-posed nature of the underlying differential equation and the presence of noise observations. 
        
    In particular, the inverse mapping is fundamentally non-unique: multiple potentials may reproduce similar spectral measurements and probability-density observations.
        
    In order to gain conceptual insight under the limitations of ill-posedness, the primary objective of Project 2 is not to exact reconstruction of the ground truth potential $V(x)$, but rather the identificaiton of operator structures that remain stable under limited information and measurement noise.