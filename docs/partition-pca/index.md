# Partition PCA

[🔗 GitHub Repo](https://github.com/Scriber-Labs/partition_pca_panel){ .md-button .md-button--primary }

# ✅ To Do
- [ ] Rewrite Introduction with updated 'narrative' (see [docs/lumo_response.md](https://github.com/Scriber-Labs/partition_pca_panel/blob/46ab52f430cc28d2b2954ed3a5e1ab313d89a088/docs/lumo_response.md) for details).

<!--
    ---
    !!! abstract __Overview__
    
        === "🥅 Goal"
    
            The purpose of this project is to use Principal Component Analysis (PCA) to gain insights into the thermodynamic behavior of a system of artificial chemical species with discrete energy levels.
    
        === "🎭 Setting the Stage"
    
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
            | $P_{ij}$              | Boltzmann probability of species $i$ being in energy level $j$         | -                                   |
            | %NA                   | % inaccessible microstates (all states with probability $P < 10^{-6}$) | %                                   | 
    
    
        === "🗺️ Conceptual Mapping"
    
            We can build a feature matrix (thermodynamic variables for each species) and perform PCA.
            The resulting principal components are then used to visualize the data in a lower-dimensional space, displaying both the *scores* (points) and *loadings* (vectors) for species projection in a 3-D space.
        
            | ✨ **ML / Data Science Interpretation** | 🐦‍🔥 **Project Implementation** |
            |:---------------------------------------| :----------------------------- |
            | **Samples**                            | chemical species |
            | **Features**                           | Thermodynamic quantities (see table above) |
            | Controlled variations                  | Temperature, chemical potential, energy-level shape |
    
    
            ??? "🔮 Future Implemenations"
    
                | ✨ **ML / Data Science Interpretation** | 🐦‍🔥 **Project Implementation**               |
                |----------------------------------------|------------------------------------------------|
                | **Labels**                             | Phases / clusters revealed by PCA / clustering |
    
        === "🔧 Current Tech Stack"
    
            - **Language:** Python
              - **Math:** Statistical mechanics · Thermodynamics · Linear algebra
              - **External libraries:** Panel, ...
    
        === "Educational Implications" 
        
            These expected observations can be used to create educational modules that help users gain a deeper understanding of the underlying relation between mathematics and physics.
    
            ???+ note "Example:"
    
                1. **Temperature Effects:** 
    
                    - Show how increasing temperature affects the partition function, energy, and entropy of the system.
                    - Show how PCA captures these changes.
    
                2. **Phase Transitions:** 
    
                    - Demonstrate how different temperature regimes lead to distinct phase behaviors.
                    - Illustrate how PCA can reveal these phase transitions by clustering thermodynamic properties.
                
                3. **Energy-Level Shapes:** 
                    - Explore how different energy-level distributions affect the system's behavior.
                    - Explore how PCA can distinguish between different energy-level shapes and their impact on system properties.
    
    ??? note "🔬 Expected vs. Observed Results"
    
        #### 1. Partition Function and Temperature Dependence
        
        - **Expectation:** The canonical partition function $Z_i$ and derived properties (e.g., average energy $\langle E_i \rangle$, entropy $S_i$, etc.) should demonstrate strong dependence on temperature.
        - **PCA Insight:** PCA should reveal that temperature is a dominant factor in the first principal component due to its effect on multiple thermodynamic properties.
        - [ ] **Observation:**
            
        #### 2. Boltzmann Distribution
            
        - **Expectation:** The Boltzmann probabilities $P_{ij}$ for the $i^\text{th}$ chemical species should behave according to the exponential distribution:
            
            $$P_{ij} \propto e^{-\beta E_{ij}} \quad \text{where} \ \beta = \frac{1}{k_B T} \, .$$
        
        - **PCA Insight:** The distribution of Boltzmann probabilities across energy levels should cluster in a distinguishable way based on temperature.
        - [ ] **Observation:**
    
            
        #### 3. Entropy and Disorder
    
        - **Expectation:** Entropy $S_i$ should increase with temperature for all species. This is a fundamental consequence of the Laws of Thermodyanmics.
        - **PCA Insight:** PCA should reveal that entropy is a key factor in distinguishing different species / conditions (particularly in the contest of *phase transitions*).
        - [ ] **Observation:**
            
        #### 4. Free Energy and Stability
    
        - **Expectation:** The Helmholtz free energy $F_i$ should decrease with temperature for species where $S_i$ increases faster than $\langle E_i \rangle$.
        - **PCA Insight:** PCA should reveal that species with lower $F_i$ values are more stable over changes in temperature. Additionally, changes in chemical potential $\mu_i$ or energy-level shape $E_{ij}$ should affect the free energy landscape.
        - [ ] **Observation:**
            
        #### 5. Phase Transitions
    
        - **Expectation:** Species with multiple energy levels should exhibit phase transitions over changes in temperature. These changes can be identified by sharp changes in thermodynamic properties.
        - **PCA Insight:** PCA should reveal distinct clusters corresponding with different phases with principal components capturing the transition points.
        - [ ] **Observation:**
            
        #### 6. Energy-Level Shape and Chemical Potential
    
        - **Expectation:** The shape of the energy levels $E_{ij}$ and chemical potentials $\mu_i$ should significantly affect thermodynamic properties.
        - **PCA Insight:** PCA should distinguish between different energy-level shapes and chemical potentials and highlight their impact on overall system behavior.
        - [ ] **Observation:**
            
        #### 7. Inaccessible Micro-States
    
        - **Expectation:** The percentage of "inaccessible" micro-states ($P < 10^{-6}$) should decrease as temperature increases.
        - **PCA Insight:** The percentage of inaccessible states should be a significant factor in the principal components, particularly for species with a wide range of energy levels.
        - [ ] **Observation:**
            
        #### 8. ✨ Linear Algebra and PCA Interpretation
    
        - **Expectation:** PCA should reduce the dimensionality of the feature matrix while retaining the most significant variations.
        - **PCA Insight:** The loading vectors (eigenvectors) should reveal which thermodynamic properties are most influential in distinguishing different species or conditions.
        - [ ] **Observation:**
    
    ---
    
    !!! tip "🔮 Future Roadmap"
    
        - Structured energy spectra
            - harmonic oscillator, double-well, clustered levels, etc.
            - compare random vs. structured PCA signatures
            - Temperature / chemical potential-sweeps to build richer higher-dimensional datasets.
        - Advanced analytics: 
            - kernel-PCA, UMAP, clustering
            - information-theoretic measures (e.g., KL divergence between species)

-->
