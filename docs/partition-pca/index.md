# 🐦‍🔥 Partition PCA

.button{}

---
!!! abstract __Overview__

    ==== "🥅 Goal"

        The purpose of this project is to use Principal Component Analysis (PCA) to gain insights into the thermodynamic behavior of a system of artificial chemical species with discrete energy levels.

    ==== "🎭 Setting the Stage"

        A system of $n$ artificial chemical species is simulated. 
        All $n$ species are assumed to have $p$ discrete energy levels. 

        Let $E_{ij} : i\in\{0,1,...,n\} \wedge j\in\{1,2,...,p\}$ denote the $j^\text{th}$ energy level of the $i^\text{th}$ species. 
        The probability of a species being in a particular energy level is drawn from a chosen distribution.

        Per $i^\text{th}$ species, we can use text-book statistical mechanics to compute the following:

        | **Symbol**            | **Meaning**                                                            | **Units**                           |
        |:----------------------|:-----------------------------------------------------------------------|:------------------------------------|
        | $\langle E_i \rangle$ | Average energy                                                         | $\mathrm{eV}$                       |
        | $S_i$                 | Entropy (Shannon / Gibbs)                                              | $\mathrm{eV} \cdot \mathrm{K}^{-1}$ |
        | $F_i$                 | Helmholtz free energy                                                  | $\mathrm{eV}$                       |
        | $Z_i$                 | Partition function                                                     | dimensionless                       |
        | $P_{ij}$              | Boltzmann probabillity of species $i$ being in energy level $j$        | -                                   |
        | %NA                   | % inaccessible microstates (all states with probability $P < 10^{-6}$) | %                                   |
        
        We can build a feature matrix (species x thermo-features) and perform PCA.
        The resulting principal components are then used to visualize the data in a lower-dimensional (3-D) space, displaying both the *scores* (points) and *loadings* (vectors) for 

    ==== "🗺️ Conceptual Mapping"
    
        | ✨ **ML / Data Science Interpretation** | 🐦‍🔥 **Project Implementation** |
        |:---------------------------------------| :----------------------------- |
        | **Samples**                            | chemical species |
        | **Features**                           | Thermodynamic quantities (see table above) |
        | Controlled variations                  | Temperature, chemical potential, energy-level shape |


        ??? 🔮 Future Implemenations

            | ✨ **ML / Data Science Interpretation** | 🐦‍🔥 **Project Implementation**               |
            |----------------------------------------|------------------------------------------------|
            | **Labels**                             | Phases / clusters revealed by PCA / clustering |

    ==== "🔧 Current Tech Stack"

        - **Language:** Python
          - **Math:** Statistical mechanics · Thermodynamics · Linear algebra
          - **External libraries:** Panel, ...

??? note "🔬 Expected vs. Observed Results"

    #### 1. Partition Function and Temperature Dependence
    
        - **Expectation:**
        - **Observation:**
        
    #### 2. Boltzmann Distribution
        
        - **Expectation:**
        - **Observation:**
        
    #### 3. Entropy and Disorder

        - **Expectation:**
        - **Observation:**
        
    #### 4. Free Energy and Stability

        - **Expectation:**
        - **Observation:**
        
    #### 5. Phase Transitions

        - **Expectation:**
        - **Observation:**
        
    #### 6. Energy-Level Shape and Chemical Potential

        - **Expectation:**
        - **Observation:**
        
    #### 7. Inaccessible Micro-States

        - **Expectation:**
        - **Observation:**
        
    #### 8. ✨ Linear Algebra and PCA Interpretation

        - **Expectation:**
        - **Observation:**
        - **Interpretation:**

!!! note "Educational Implications" 
    
    These expected observations can be used to create educational modules that help users gain a deeper understanding of the underlying relation between mathematics and physics.

    ??? "🔷 Example:"

        1. **Temperature Effects:** 
           - Show how increasing temperature affects the partition function, energy, and entropy of the system.
           - Show how PCA captures these changes.
        2. **Phase Transitions:** 
           - Demonstrate how different temperature regimes lead to distinct phase behaviors.
           - Illustrate how PCA can reveal these phase transitions by clustering thermodynamic properties.
        3. **Energy-Level Shapes:** 
           - Explore how different energy-level distributions affect the system's behavior.
           - Explore how PCA can distinguish between different energy-level shapes and their impact on system properties.


---

!!! tip 🔮 Future Roadmap

    - Structured energy spectra
        - harmonic oscillator, double-well, clustered levels, etc.
        - compare random vs. structured PCA signatures
        - Temperature / $\mu$-sweeps to build richer higher-dimensional datasets.
    - Advanced analytics: 
        - kernel-PCA, UMAP, clustering
        - information-theoretic measures (e.g., KL divergence between species)


