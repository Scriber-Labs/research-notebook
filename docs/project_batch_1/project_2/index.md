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

        ```mermaid
            %%{ init: {
                "theme": "base",
                "themeVariables": {
                    "background": "#0D1117",
                    "primaryColor": "#14B5FF",
                    "primaryTextColor": "#F0F6FC",
                    "primaryBorderColor": "#14B5FF",
                    "lineColor": "#4CC9F0",
                    "secondaryColor": "#0070EB",
                    "tertiaryColor": "#0D1117",
                    "fontFamily": "'Aclonica', sans-serif",
                    "fontSize": "24px",
                    "clusterBkg": "rgba(20, 181, 255, 0.02)",
                    "clusterBorder": "#14B5FF",
                    "edgeLabelBackground":"#0D1117",
                    "nodeSpacing": 81,
                    "rankSpacing": 131,
                    "borderRadius": "16"
                },
                "themeCSS": ".node rect, .node circle, .node ellipse, .node polygon, .node path { stroke-width: 2.618px !important; filter: drop-shadow(0px 4px 6px rgba(0,0,0, 0.5)); } .node { filter: saturate(1.2) contrast(1.1); } .cluster rect { rx: 25.8; ry: 25.8; stroke-width: 1px; stroke-dasharray: 10,5; } .nodeLabel, .edgeLabel, .cluster-label, .label text, text { color: #F0F6FC !important; fill: #F0F6FC !important; font-weight: 300; } #PIML .cluster-label { fill: #00FFFF !important; font-size: 20px; } #PIML rect { stroke: #00E8FF; fill: rgba(0, 232, 255, 0.04); }",
                
                "flowchart": {
                    "curve": "basis",
                    "useMaxWidth": true,
                    "htmlLabels": true,
                    "rankSpacing": 131,
                    "nodeSpacing": 81
                }
            }[]()
            }%%
                
            flowchart LR
            style A fill:#2a0037,stroke:#7952F5,stroke-width:4px,color:#FFF9D6,rx:16, ry:16;
            %%style A fill:#2a071b,stroke:#FE28A2,color:#ffffff,stroke-width:2px,stroke-dasharray:6 6,rx:16,ry:16;
            style B fill:#142034,stroke:#5280ff,stroke-width:2px,color:#ffffff,rx:16,ry:16;
            style C fill:#0d1a30,stroke:#3b82ff,stroke-width:3px,color:#ffffff,rx:16, ry:16;
            style D fill:#0d2827,stroke:#03E8BD,stroke-width:2px,color:#ffffff,rx:16,ry:16;
            style E fill:#0a0f1a,stroke:#22d3ee,stroke-width:2px,color:#ffffff,rx:16, ry:16;
            style F fill:#0d1b2a,stroke:#00d4ff,color:#ffffff,stroke-width:2px,rx:16,ry:16;
            style G fill:#1a1a1a,stroke:#ffcc00,stroke-width:3px,color:#ffffff,rx:16,ry:16;
        
        
                
                A("️1️⃣ Define known TISE <br> dynamics for <br> 1-D Harmonic <br> Oscillator") --> B("2️⃣ Generate <br> noisy <br> observations")
                B --> C("3️⃣ Learn potential <br> and <br> associated <br> eigenstates")
                C --> D("4️⃣ Constrain with <br> physics residual")
                D --> E("5️⃣ Regularize with <br> smoothness")
                E --> F("6️⃣ Analyze learned <br> geometry via POD")
                F --> G("7️⃣ Determine what <br> information remains <br> identifiable?")
                
        ```

        !!! info "Conceptual description of what the model is learning (step 3️⃣)"

            The [neural architecture](architecture.md) jointly parameterizes:

            $$ V_\theta(x)\, , \quad \psi_n^\theta(x) \, , \quad E_n^\theta$$
        
            for $i=0,1,2$ using lightweight differentiable neural networks.

            
            !!! ember "The eigenfunctions $\psi_n^\theta(x)$ are not freely learned fields."

                The learned eigenstates are constrained by multiple coupled structures:
                    
                - The time-independent Schrödinger equation (TISE).
                - Weighted $L^2$ normalization.
                - Sequential Grahm-Schmidt orthogonalization.
                - Shared dependence on the learned potential $V_\theta(x)$.

                Thus, the architecture beaves as a **constrained operator-eigenfunciton system** rather than an unconstrained function approximator.

    === "🔢 Numerical Methods"

        - A central difference stencil is used to approximate the $\partial_{xx}$ operator.
        - In the training loop, orthonormalization (via Gram-Schmidt and l2 inner product with trapezoidal weighting) is performed before the loss function is calculated. Consequently, the physics residual is evaluated using orthonormalized eigenfunctions, giving a learned Hamiltonian system $$H_\theta \hat{\psi}_n^\theta \approx E_n^\theta \hat{\psi}_n^\theta \, , $$ whose deviation from the eigenvalue equation is minimized during training. ✨
            - Sequential Gram-Schmidt orthogonalization ensures learned orthogonal wavefunctions are orthgonal and consistent with the requirement that Hamiltonian eigenfunction be orthgonal.
            - Since the system is trained on a uniform grid, we implement the Trapezoidal Rule to provide a discrete approximation of the continuous Hilbert-space inner product.
            - Consistent use of the Trapezoidal Rule throughout the l2 inner product steps and POD weighting ensures consistency in normalization between the learned wavefunctions in the training loop and the POD analysis.

        !!! eigenote "Note on POD usage in Project 2"
            
            Proper orthogonal decomposition (POD) is treated as a diagnostic probe of learned basis geometry rather as a computational tool for dimension reduction.

??? eigenote "♾️ Note on Ill-posedness"
            
    The inverse Schrödinger problem is a challenging task due to the ill-posed nature of the underlying differential equation and the presence of noise observations. 
        
    In particular, the inverse mapping is fundamentally non-unique: multiple potentials may reproduce similar spectral measurements and probability-density observations.
        
    In order to gain conceptual insight under the limitations of ill-posedness, the primary objective of Project 2 is not to exact reconstruction of the ground truth potential $V(x)$, but rather the identificaiton of operator structures that remain stable under limited information and measurement noise.