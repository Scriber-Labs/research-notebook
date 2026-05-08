# Partition PCA: Thermodynamic Fingerprints of Molecular Architectures

[🔗 GitHub Repo](https://github.com/Scriber-Labs/partition_pca_panel){ .md-button .md-button--primary }

### ✔️ To Do
- [x] Rewrite Introduction with updated 'narrative' (see [docs/lumo_response.md](https://github.com/Scriber-Labs/partition_pca_panel/blob/46ab52f430cc28d2b2954ed3a5e1ab313d89a088/docs/lumo_response.md) for details).
- [ ] Polish introduction 
  - [ ] Grammar and wording
  - [ ] Resolve all sanity checks and needed citations.

---
!!! abstract "__Introduction__"

    === "🥅 Goal"

        The purpose of this project is to investigate whether distinct **molecular architectures** (defined by their discrete energy level structures) produce unique, separable **thermodynamic fingerprints** when subjected to *thermal stress*.
        Here, Principal Component Analysis (PCA) is employed to visualize these differences in a reduced-dimensional space.

    === "🗝️ Keywords"

        - **Molecular Architecture**:
            - Defined by the spatial arrangement of atoms / molecules that comprise a system.
            - Directly determines the quantized energy levels of the atoms / molecules that comprise a system.
        - **Thermodynamic Fingerprint**:
            - A unique combination of thermodynamic properties that can be used to distinguish between different molecular architectures.
            - Can be used to identify and classify molecular architectures using the relation between architecture-driven energy levels and textbook statistical mechanic principles.
        - **Thermal Stress**:
            - Mechanical stress applied to a system undergoing changes in temperature.
            - Results in expansion or contraction (changes in volume) according to equation of state for the system.
        - **Hydro-Coherent Domain:**
            - A descriptor of highly ordered, low-entropy water structures (analogous to the "Exclusion Zone" pheonmenon) without making claims about the exstence of a new state of matter.
        - **Phase Transition vs. Crossover**:
            - Phase transitions are abrupt changes in the thermodynamic properties of a system, while crossovers are smooth, continuous changes.
            - In finite systems, crossovers are observed as gradual changes in thermodynamic properties without the formation of new phases or symmetry breaking.
                
                !!! warning "️⚠️ Citation needed!"

            - Phase transitions are often associated with the formation of new phases or the breaking of symmetry, while crossovers are more gradual and can occur within a single phase.

    === "🎭 The Hypothesis"

        In complex fluids, water molecules at the interfacial regions of various hydrophillic materials behave differently than typical "bulk" liquid water.
        While bulk liquid water is highly entropic, past research has shown water molecules at the interface of such hydrophillic surfaces form a 'structured, quasi-crystalline' complex with distinct energy levels.
        
        !!! warning "⚠Citation needed!"

        If such phases of water exist, then changes to variables of their function of state in response to changes in temperature should be fundamentally different from disordered bulk liquid water.
        
        !!! warning "Citation needed!"
            
            - [ ] Check if function of state is being used appropriately here.

        ??? note "$H_0$ and $H_1$ hypotheses"
           
            - $H_0$: There is no significant difference in the function of state between bulk liquid water and hydro-coherent domains.
            - $H_1$: There is a significant difference in the function of state between bulk liquid water and hydro-coherent domains.

!!! note "📋 Methods"

    === "🧪 Simlulation Overview"

        We simulate a mixture of $n$ hypothetical molecular species, each with $p$ discrete energy levels.
        Each species is categorized into two broad classes:

        1. **Disordered Architectures:** Random energy level distributions (analogous to bulk fluid).
        2. **Structured Architectures:** Ordered energy gaps (e.g., harmonic oscillators, double-wall potentials) corresponding with "quasi-crystalline phases".

        For each $i^\text{th}$ species, we compute the canonical ensemble properties across a temperature sweep $T \in [  50 \, \mathrm{K}, 100 \, \mathrm{K} ]$:

        | **State Variable** | **Interpretation** | **Intensive vs. Extensive** |
        | :--------- | :----------------- | :-------------------------- |
        | $\langle E_i \rangle$ | Average Energy | Extensive |
        | $S_i$ | Entropy (Gibbs / Shannon) | Extensive |
        | $F_i$ | Helmholtz Free Energy | Extensive |
        | $Z_i$ | Partition Function | Extensive |
        | $P_{ij}$ | Boltzmann probability of energy level $j$ | Intensive |
        | $\% \text{NA}$ | % Inaccessible microstates ($P < 10^{-6}$) | Extensive (by definition, as it is a ratio of extensive quantities) |
    
        ??? warning "‼️ Sanity-Check Extenstivity Classification"
            - [ ] $P_{ij}$ 
            - [ ] $\% \text{NA}$
                - [ ] Sanity check the following statement:
                    
                    The % Inaccessible microstates metric is calculated as the percentage of energy levels with Boltzmann probabilities below a threshold ($P < 10^{-6}$). This metric is extensive because it is a ratio of extensive quantities (total number of energy levels and number of inaccessible microstates).

    === "🗺️ Concept Map: Thermodynamic PCA"

        We construct a *feature matrix* where rows correspond with individual molecular instances columns are their thermodynamic state variables at a fixed pressure.
        
        #### PCA Justificaiton

        1. **Dimension reduction:** Compresses the n-D thermodynamic feature space into principal components. This allows visualization of the data projected onto a 3D Euclidean space, where each axis corresponds with the first three variables that varied the most over the temperature sweep.
        2. **Clusters:** Determine if "Structured" and "Disordered" architectures naturally separate in this 3D space.
        3. **Identify Drivers:** Use loading vectors (eigenvectors) of examine which state variable in the feature matrix drives the separation.

            | **Data Science Concept** | **Stat Mech Interpretation** | **PCA Interpretation** |
            | :----------------------- | :--------------------------- | :--------------------- |
            | **Samples** | Individual molecular instances | Data points projected in a 3D space (principal component space) |
            | **Features** | Thermodynamic state variables | Axes of variance |
            | **Clusters** | Distinct thermodyanmaic phases | Grouped points in principal component space |
            | **Loadings** | Coupling between properties | Direction of property influence |

---

??? note "Expected Observations & Validation"

    | **Expected Observation** | **Experimental Hypothesis** | **PCA Insight** | **Interpretation** |
    | :----------------------- | :--------------------------- | :--------------------- | :--------------------- |
    | **1. Temperature as the Primary Driver** | $H_1$: Low $T$ corresponds with 'frozen' state variables <br> Increasing $T$ leads to increased variance in thermodynamic state variables | PC1 should capture the global thermal excitation trend. | If "Structured" "Disordered" systems separate *despite* this trend, it is evidence suggesting their intrinsic state variables are robust |
    | **2. The "Structured" Signature** | $H_1$: **Quasi-crystalline phases** (e.g., harmonic oscillator / double-well potential) exhibit lower $S$-values and more negative $F$-values (higher stability) | These systems should separate into distinct clusters in PCA space according to the **Entropy** and **Helmholtz Free Energy** loading eigenvectors | Structured species have points that are more tightly grouped in the principal component space | 
    | **3. Crossover Regimes (*Not* Phase Transitions)** | $H_1$: Thermal crossover regimes emerge as sharp changes in heat capacity $C_v \approx \frac{d \, \langle E \rangle}{dT}$ between different classes (Structured vs. Disordered) of molecular instances | The PCA clusters should shift or rotate as we sweep the snapshot temperature accross these crossover intervals |  |
    | **4. Inaccessible States as a Stability Metric** | $H_1$: At moderate $T$, structured molecular instances retain a higher percentage of inacessible states than disordered molecular instances at moderate $T$ (rigidity) | The $\% \text{NA}$ loading should point strongly toward the "Structured" clusters comapred to the "Disordered" ones. | Structured molecular instances should exhibit lower $S$, which corresponds with decreased $\% \text{NA}$ compared to "Disordred" molecular instaces. | 

---

!!! tip "Future Roadmap"

    - [ ] **Interactive Dashboard (Panel):**

        - Real-time temperature sweeps.
        - Toggle between "Random" vs. "Structured" energy generation.
        - Dynamic 3D PCA visualization with hover-over thermodynamic details.
        - The Scriber Experience theme applied with consistent color encoding for different experimental features (see [`thermodynamics-pca-streamlit`](https://github.com/Scriber-Labs/thermo-pca-simulation/tree/197e66ac9811e06a1c8ce578bdec6722457ed0a6/src) for theme, layout, and color preferences ).

    - [ ] **Advanced Analytics:**

        - [ ] **KL Divergence:** Quantify the information distance between the "Disordered" and "Structured" probability distributions.
            
            !!! question

                🧙‍♂️ Q: What probabilty distributions are we specifically refering to here?
            
                📜 A: We are referring to the probability distributions of molecular states in the "Disordered" and "Structured" clusters. These distributions represent the likelihood of finding a molecule in a particular state at a given temperature.
        
        - [ ] **Kernel PCA:** Non-linear mapping to detect subtle phase-like boundaries.
        - [ ] **Networked Systems:** Couple the species to simulate interaction (moving towards 🧠 territory).


    !!! quote "LUMO-generated summary of ⚡ Electromagnetic & Biophysical Context"

        This project is inspired by the intersection of **Statistical Mechanics** and **Classical Electromagnetism**, specifically the work of **Herbert Fröhlich** on biological coherence.

        - **The Analogy:** Just as an LC circuit (inductor-capacitor) has specific resonant frequencies, molecular structures have discrete energy levels.
        - **The Hypothesis:** "Hydro-Coherent Domains" act as **dielectric resonators**. Unlike "Bulk" (disordered) water, these domains can sustain **coherent vibrational modes** when pumped with metabolic energy.
        - **The Vector Potential ($\mathbf{A}$):** Fröhlich suggested that living systems might be sensitive to the magnetic vector potential, acting as a "chemical potential" for coherence. In our simulation, this could manifest as a **shift in energy levels** that disproportionately affects the thermodynamic stability of coherent domains.

        **Why PCA?**

        - If a Hydro-Coherent Domain is truly distinct, its response to thermal noise (Temperature) and external fields (Vector Potential) should be **non-linear** and **separable** from disordered systems in the thermodynamic feature space.
        - PCA provides the lens to visualize this separation.

        ??? quote "The Snap Circuits Bridge"

            1. The "Molecule" $\Rightarrow$ A Capacitor/Inductor Circuit
                - Discrete energies $E_j$ correspond to **resonant frequencies** of an LC circuit.
                - Random Architecture: A messy circuit with random component values (noise)
                - Hydro-Coherent Domain: A tuned LC circuit (resonator) where energy builds up coherently.

            2. Temperature $T$ $\Rightarrow$ (Johnson-Nyquist noise) Noise/Thermal Agitation
                - In a circuit, thermal noise (Johnson-Nyquist noise) jitters the electrons.
                - At low $T$, the circuit is quiet (ground state).
                - At high $T$, the noise drowns out the signal.

            3. The "Coherence" (Fröhlich) $\Rightarrow$ Dielectric Resonance
                - If you pump energy into the "Hydro-Coherent" system, it doesn't just heat up randomly. It locks into a specific mode (like a laser).
                - Stat Mech View: The Boltzmann distribution gets distorted. Instead of a smooth decay, you get a "bunching" of probability in one specific energy level (the coherent mode).
                - PCA View: This "bunching" creates a unique thermodynamic fingerprint that separates it from the "Random" noise.

            4. The Vector Potential $A$ $\Rightarrow$ External Field Shifts Energy Levels
                - In your simulation, you can imagine $A$ as an external field that shifts the energy levels ($E_j \rightarrow E_j - qA$).
                - If the system is a hydro-coherent domain, it might be hyper-sensitive to tiny changes in $A$, causing a massive shift in its thermodynamic properties (e.g., a huge jump in entropy or Helmholtz free energy).
                - Your PCA could detect these shifts: If you add a "Vector Potential" parameter to your simulation, the "Structured" cluster(s) might move dramatically in the PCA space, while the "Random" cluster stays relatively stable.

            ??? quote "Next Steps for Snap Circuits Intuition"

                If you want to deepen this connection in your code later:
              
                1. **Model the Energy Levels as an LC Circuit:**
                    - $E_n = \hbar \omega (n + 1 / 2)$ where $\omega = 1 / \sqrt{LC}$.
                    - Change $L$ or $C$ to simulate different "molecular architectures".
                2. **Add a "Field" Parameter:**
                    - Simulate a weak external field (like $\mathbf{A}$) that slightly shifts the energy levels.
                    - Watch how the Hydro-Coherent cluster moves in the PCA plot compared to the Random cluster.
            
---

### 📚 References & Inspiration
*   Pollack, G. H. (2013). *The Fourth Phase of Water*.
*   Fröhlich, H. (1968). *Long-range coherence and energy storage in biological systems*.
*   Standard Textbooks: Atkins' *Physical Chemistry*

