# :eigenote: Philosophy

!!! eigenote "Philosophy"

    Scriber Labs develops computational methods for constructing mathematical formalizations that represent underlying 
    structure in natural systems and support the development of interpretable models. The goal is to develop models 
    whose representations of structure can be simulated, evaluated, and empirically tested.

    !!! eigenote "Core Commitments"

        1. Reject opaque black-box models in favor of transparent, interpretable models.
        2. Devolop strategies for model validation 

# :eigenote: Definitions
---

!!! warning ":ember: User discretion is advised."

    The following definitions/conventions are specific to Scriber Labs projects and are not used in standard literature. 
    Moreover, they are subject to change as I work through projects and update them for the purposes of clarity and consistency among all projects.

## :eigenote: Physical Structure


!!! eigenote "Overview"

    Unless otherwise specified, the use of the term **physical structure** refers to any mathematical object, 
    relationship, or constraint that restricts the admissible states or evolution of a system.

    The purpose of this convention is to provide emphasis on the idea that physical systems are not merely a 
    collection of variables. Rather, physical structure determines relationships between those varaibles and restricts 
    which states or evolutions are physically admissible.

!!! eigenote "Formal Definitions"

    !!! defiinition "Ambient State Space"

        The **ambient state space** $X$ is defined as the space containing all the possible states (or trajectories)
        $x\in X$ a physical system of interest may obtain.

        We use the term *ambient* is here for emphasis on the significance of the ambient state space $X$ as a 
        fundamental concept in the study of physical systems. It serves as a container for all possible states or 
        trajectories that a physical system can attain, regardless of the specific mathematical representation used 
        to describe it. 

        The choice of mathematical representation for $X$ depends on the system being studied, and 
        different systems may require different representations to accurately capture their behavior and properties. 
        Examples of ambient state spaces include finite-dimensional vector spaces, function spaces, manifolds, and 
        spaces of probability distributions, among others.

    !!! definition "Structure and Admissibility"

        Let $S$ denote the physical structure imposed on the system. Rather than requiring $S$ be represented using a 
        particular mathematical framework, we use $S$ as an abstract placeholder for whatever collection of mathematical 
        objects, relationships, symmetries, invariants, or constraints determine admissiblity for the problem at hand.

        Conceptually, we write
        
        $$\boxed{(X,S) \rightsquigarrow \mathcal{M}_{S}}$$

        where $\rightsquigarrow$ informally denotes "induces", "gives rise to", or "determines".

        ??? eigenote "__$\rightsquigarrow$  vs. Function Arrows__"
        
            The $\rightsquigarrow$ notation used here is intentionally less specific than a function arrow 
            (e.g., $f: X \rightarrow Y$). It is meant to indicate a structural relation similar to that of a function 
            arrow, without asserting that $S$ necessarily acts as an ordinary function.

        The resulting
        
---

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
    
    ??? eigenote
    
        - 🎗️ For Scriber Labs projects, the *admissible set* $\mathcal{M}_\mathcal{S}$ is induced by the *structure* $\mathcal{S}$.
        - 🔮 Generalizing to other Scriber Labs projects $\implies$ replace $\mathcal{S}$ with:
            - Hamiltonian systems
            - Kuramoto
            - DFT/SCF
            - Bayesian inverse problems
            - etc.    