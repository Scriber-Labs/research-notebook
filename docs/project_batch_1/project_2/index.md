# Project 2: Low-Fidelity Inverse Schrödinger Problem

!!! abstract "**Overview**"

    === "🥅 Goal"

        The purpose of project 2 is to study operator features that are identifiable in a low fidelity physics-informed machine learning prototype for the inverse Schrödinger problem.    
        
    === "5️⃣ 5 Brunton Steps"

        | **Step** | **Description** | **Completed?** |
        |----------|-----------------|----------------|
        | 1. **Problem formulation** | Can a physics-informed neural network recover the unknown potential $V(x)$ along with the corresponding eigenfunctions from only noisy spectral data and probability-density snapshots? | ✔️ |
        | 2. **Data collection & curation** | - Uniform collocation grid of spatial points $x\in [-5,5]. <br/> - Noisy energy and probability density observations. | ✔️ |
        | 3. **Neural architecture**        | Two lightweight neural networks with tanh activations (see [Project 2 architecture diagram](architecture.md)) | ⚠️ Both neural networks are scalar-in, scalar-out, fully differentiable, and deliberately kept shallow to preserve interpretability. |
        | 4. **Loss function**              | All terms are soft penalties with static $\lambda$ weights (see [Project 2 loss function](loss-function.md)). | ✔️ |
        | 5. **Optimization**               | - Adam optimizer with a fixed learning rate. <br/> - Forward pass training loop that computes loss terms and uses backpropagation to update $V_\theta$ and $\psi_n^\theta$. | ❌⚠️ As in project 1, the optimizer is intentionally vanilla; the aim is to expose how the physics prior interacts with noisy data, not to chase maximal performance |

    === "🌍 Global Design Choices"


??? info "Conceptual Description of What the Model is Learning"
    
    !!! note "What the ML model learns"

        **Neural Ansatz:** Let a neural network represent the potential 
            
        $$V_\theta(x) \quad \text{small MLP}$$

        !!! warning "The model is *not* learning wavefunctions."
            The wavefunctions are *constrained* by the physics loss.
    
    !!! note "Each epoch optimizes the networks weights $\theta$ for $\{ V_\theta, \psi_n^\theta, E_n^\theta \}$."

        This involves minimization of the [loss function](loss-function.md).

??? tip "🗝️ Key Points"

    - **Indirect supervision:** Project 2 architecture resembles a *coupled operator-eigenfunction learning system*.
    - **Proper orthogonal decomposition (POD)** is used as a diagnostic tool. This is useful for handling data geometry in an interpretable manner.
