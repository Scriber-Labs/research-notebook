# :eigenote: Definitions
---

!!! warning ":ember: User discretion is advised."

    The following definitions/conventions are specific to Scriber Labs projects and are not used in standard literature. 
    Moreover, they are subject to change as I work through projects and update them for the purposes of clarity and consistency among all projects.

## :eigenote: Physical Structure


!!! eigenote "Overview"

    Unless otherwise specified, the use of the term **physical structure** will refer to
    to ***any mathematical object or constraint that restricts the admissible states or evolutions of a system***.

!!! eigenote "Formal Definition"

    Suppose  $\mathcal{X}$ denotes the *state space* of all mathematically possible states $\mathcal{x}\in\mathcal{X}$ of a system. Then the 
    **physical structure** $\mathcal{S}$ determines an admissible subset of states and trajectories that satisfy governing laws,
    symmetries, invariants, or geometric contraints of the system.

    In particular, $\mathcal{S}$ is a collection of constraints, symmetries, or invariants that induces

    $$ \mathcal{M}_{\mathcal{S}} \subseteq \mathcal{X} \, .$$

    !!! eigenote "Summary of variables"

        - $\mathcal{X}$: state space of all mathematically possible states $\mathcal{x}\in\mathcal{X}$ of a system
        - $\mathcal{S}$: **physical structure** that restricts the admissible states or evolutions of a system
        - $\mathcal{M}_{\mathcal{S}}$: admissible subset of states and trajectories that satisfy governing laws, 
          symmetries, invariants, or geometric contraints of the system

!!! example "Examples"

    !!! example "$\mathcal{X}$: State Space"  
 
        :eigenote: **Simple Harmonic Oscillator**
        $$ \mathcal{X} = \mathbb{R}^2 \, , \quad \mathcal{x} = (q,p) \quad \text{(phase space)} $$
    
        :eigenote: **Quantum Mechanics**

        - Generally,
        $$ \mathcal{X} = \mathcal{H} \quad \text{(Hilbert space)} $$
    
        - For the time-independent Schrödinger equation,

            $$ \mathcal{x} \in \Bigg\{ \psi : \bigg[ -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial q^2} + V(q) \bigg] \psi = E \psi \Bigg\} $$

        :eigenote: **Probability Distributions**

        $$ \mathcal{X} = \big\{ \rho : \rho \geq 0 \, , \int{\rho} = 1 \big\} $$
        