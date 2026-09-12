## :eigenote: Philosophy

!!! eigenote "Philosophy"

    Scriber Labs develops computational methods for constructing mathematical formalizations that represent underlying 
    structure in natural systems and support the development of interpretable models. The goal is to develop models 
    whose representations of structure can be simulated, evaluated, and empirically tested.

    !!! eigenote "Core Commitments"

        1. Reject opaque black-box models in favor of transparent, interpretable models.
        2. Devolop strategies for model validation 

## :eigenote: Definitions
---

!!! warning ":ember: User discretion is advised."

    The following definitions/conventions are specific to Scriber Labs projects and are not used in standard literature. 
    Moreover, they are subject to change as I work through projects and update them for the purposes of clarity and consistency among all projects.


!!! eigenote "Overview"

    Unless otherwise specified, the use of the term **physical structure** refers to any mathematical object, 
    relationship, or constraint that restricts the admissible states or evolution of a system.

    The purpose of this convention is to provide emphasis on the idea that physical systems are not merely a 
    collection of variables. Rather, physical structure determines relationships between those varaibles and restricts 
    which states or evolutions are physically admissible.

!!! eigenote "Formal Definitions"

    !!! defiinition "Ambient State Space"

        The **ambient state space** $\mathcal{X}$ is defined as the space containing all the possible states (or trajectories)
        $\mathcal{x}\in \mathcal{X}$ a physical system of interest may obtain.

        We use the term *ambient* is here for emphasis on the significance of the ambient state space $\mathcal{X}$ as a 
        fundamental concept in the study of physical systems. It serves as a container for all possible states or 
        trajectories that a physical system can attain, regardless of the specific mathematical representation used 
        to describe it. 

        The choice of mathematical representation for $\mathcal{X}$ depends on the system being studied, and 
        different systems may require different representations to accurately capture their behavior and properties. 
        Examples of ambient state spaces include finite-dimensional vector spaces, function spaces, manifolds, and 
        spaces of probability distributions, among others.

    !!! definition "Structure and Admissibility"

        Let $\mathcal{S}$ denote the **physical structure** imposed on the system. Rather than requiring $\mathcal{S}$ 
        be represented using a particular mathematical framework, we use it as an abstract placeholder for whatever 
        collection of mathematical objects, relationships, symmetries, invariants, or constraints determine admissiblity 
        for the problem at hand.

        Conceptually, we write
        
        $$\boxed{(\mathcal{X},\mathcal{S}) \rightsquigarrow \mathcal{M}_\mathcal{S}}$$

        where $\rightsquigarrow$ informally reads as "induces", "gives rise to", or "determines".
 
        Note that the $\rightsquigarrow$ notation is intentionally less specific than a function arrow 
        (e.g., $f: X \rightarrow Y$). It is meant to indicate a structural relation similar to that of a 
        function arrow, without asserting that $\mathcal{S}$ necessarily acts as an ordinary function.

        !!! eigenote "Admissible state set"

            The resulting **admisible state set** is

            $$ \mathcal{M}_\mathcal{S} = \{ \mathcal{x}\in \mathcal{X} | \mathcal{x} \, \text{satisfies the structure} \, \mathcal{S} \} \, .$$

            Again, we leave our definition intentionally general. Depending on the problem, admissibility may be expressed
            via equations, inequalities, symmetries, conservation laws, systems of differential equations, geometric 
            constraints, etc.

        Thus, 

        $$\mathcal{M}_\mathcal{S} \subseteq \mathcal{X}$$ 

        represents the remaining set of states that are admissible after the $\mathcal{S}$ has been imposed.
        
    !!! eigenote "States and Evolutions"

        The admissible state set $\mathcal{M}_\mathcal{S}$ is not the same thing as the admissible trajectory. This
        nuance arises from distinguishing a **trajectory** as a map

        $$\gamma : \mathcal{I} \rightarrow \mathcal{X}$$

        where $\mathcal{I}$ denotes the relevant parameter interval (e.g., a period of time $t$).

        Importantly a given physical structure $\mathcal{S}$ may impose both

        $$\mathcal{M}_\mathcal{S} \subseteq \mathcal{X}$$

        and

        $$\gamma(t) \in \mathcal{M}_\mathcal{S} \, ,$$

        or more generally restrictions on the evolution law itself. Thus, Scriber Labs convention distinguishes

        $$\text{admissible states} \neq \text{admissible evolutions} \, ,$$

        the later of which may be determined by additional dynamical structure.

        
!!! eigenote "Summary of variables"

    | **Symbol** | **Meaning** |
    | :--- | :--- |
    | $\mathcal{X}$ | Ambient state space containing the mathematically possible states under consideration |
    | $\mathcal{x}$ | A state satisfying $\mathcal{x} \in \mathcal{X}$ |
    | $\mathcal{S}$ | Physical structure: mathematical objects, relationships, symmetries, invariants, or constraints that determine admissibility |
    | $\mathcal{M}_\mathcal{S}$ | Admissible subset of states induced by $\mathcal{S}$ |
    | $\gamma$ | A trajectory through the state space |
    | $\rightsquigarrow$ | Informal structural relation meaning “induces,” “gives rise to,” or “determines” |

        

---

### :eigenote: Examples 
  

!!! example "Example Table - Structure $\mathcal{S}$ ddepends on context"

    | **Context** | **Ambient Space** $\mathcal{X}$ | **Example Structure** $\mathcal{S}$ | **Possible** $\mathcal{M}_\mathcal{S}$ |
    |:---|:---|:---|:---|
    | Ordinary Cartesian mechanics | phase space <br> $\mathcal{P} = \{ (q,p) : q\in Q \, , p\in\mathbb{R}^n \}$ | fixed energy ($E$) <br> constraint | $\{(q,p) \in \mathcal{P} : H(q,p)=E\}$ | 
    | Differential geometry | manifold | geometric constraint | submanifold |
    | Dynamical systems | space of candidate trajectories | system of differential equations | solution trajectories |
    | Probability | space of candidate distributions <br> $\mathcal{X} = \{ \rho : \rho \geq 0 \, , \int{\rho} = 1 \}$ | normalization/positivity | admissible distributions |
    | Quantum mechanics | Hilber space $\mathcal{H}$ | eigenvalue equation | eigenspace |
    | Optimization | parameter space | inequality/equality constraints | feasible set |
    | Graph theory | space of graphs | connectivity condition | connected graphs |
    | PIMLs | parameter/function space | governing physical laws | physicall admissible sets |


??? eigenote "🎗️Reminder"
    
    - For Scriber Labs projects, the *admissible set* $\mathcal{M}_\mathcal{S}$ is induced by the *structure* $\mathcal{S}$.
    - 🔮 Generalizing to other Scriber Labs projects $\implies$ replace $\mathcal{S}$ with:
        - Hamiltonian systems
        - Kuramoto
        - DFT/SCF
        - Bayesian inverse problems
        - etc.  