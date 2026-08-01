# Project 1: Low-Fidelity Harmonic Oscillator

<div class="center-button" markdown>
[🔗 GitHub Repo](https://github.com/Scriber-Labs/lf-pinn-harmonic-oscillator){ .md-button .md-button--primary }
</div>

!!! abstract "__Overview__"

    === "🥅 Goal"

        Create a foundational teaching model in PIML design, emphasizing interpretability and parsimony over raw
        accuracy.

    === "🗝️ Key Points"

        - Simulates a 1D **simple harmonic oscillator (SHO)** with an *unknown frequency* while softly enforcing the
          equation of motion for the SHO and analyzing energy conservation.
        - Prioritizes **geometric intuition** and **visibility of failure modes** over benchmark performance.
        - Motivated by the perspective taken by [Kutz & Brunton (2022)](https://databookuw.com/databookV2.pdf) that
          **parsimony** itself is a powerful regularizer in PIML architectures.
        
    === ":eigenote: Physical Structure"

        The 1D simple harmonic oscillator is interpreted as a system defined by the physical structure 
        $$ \mathcal{S} = \{ \text{Euler-Lagrange equation, energy conservation, symplectic symmetry} \}$$ 
        rather than a simple curve-fitting of the observed trajectory $q(t)$.

        | **State Space** $\mathcal{X}$ | **Structure** $\mathcal{S}$ | **Admissible Set** $\mathcal{M}_\mathcal{S}$|
        | :---------- | :---------- | :---------- |
        | Phase Space, $\mathbb{R}^2$  | $\big\{ \ddot{q} + \omega^2 q = 0 \, , \, \dot{E} = 0 \big\}$ | $q(t) \in \big\{ \mathbb{R}^2 : \mathcal{S} \, \text{holds} \big\}$ |
        


!!! eigenote "PIML Design"

    === "5️⃣ 5 Brunton Steps"

        | **Step** | **Description** | **Completed?** |
        | :---------- | :---------- | :---------- |
        | 1. **Problem formulation** | Can a neural function approximator recover physically meaningful motion via minimization of a variational residual, rather than fitting observed data? | ✅ |
        | 2. **Data collection & curation** | - Intentionally minimal (i.e., no observable trajectories). </br> - Collocation points in time serve as synthetic "data" that serves to embed physics into training .| ❌ |
        | 3. **Neural architecture** | - Low-depth MLP, scalar input $\rightarrow$ scalar output, `tanh` activations. </br> - No convolutions, recurrences, or unnecessary inductive biases. </br> - Physics enters through the *loss function*, not the architecture | ⚠️ |
        | 4. **Loss function** | $$ L_\text{phys}=\big\langle (\ddot{q} + \omega^2 q)^2 \big\rangle $$ </br> Encodes *Euler-Lagrange structure*, *second-order dynamics*, and *physical consistency*. | ✅ |
        | 5. **Optimization strategy** | - Standard Adam optimizer with fixed learning rate. </br> - Optimization is intented to *reveal physical structure*, rather than fully customize for performance. | ❎⚠️ |

    === "🌎 Global Design Choices"

        Designed to be low fidelity and interpretible. This means
   
        - Physical structure is encouraged via a soft penalty term in the loss function.
        - Constraints are not directly enforced.
        - We do not seek to design a strict symplectic integrator.

        > 🏡 **Take-Home Message** The overall model is biased towards a Hamiltonian structure without being strictly 
          symplectic.

    === "🔢 Numerical Methods"
