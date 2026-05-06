---
bibliography: ../references/references.bib
csl: apa.csl
---
# Governing Equations

## 🍨 Kuramoto Model 

The time-evolution of the phase $\theta_i$ of the $i^\text{th}$ oscillator in the ensemble is governed by the **Kuramoto model** (vanilla version with noise term):

$$ \dot{\theta}_i = \omega_i + \frac{K}{N}\sum_{j=1}^{N}{A_{i,j} \, \sin(\theta_j - \theta_i)} + \xi_i(t) \, .$$

|  **Variable** | ✨ **Interpretation**                                                 | 📝 **Notes**                                                                                                                              |
|:----------------|:---------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------|
| $\omega_i$      | *intrinsic frequency* of the $i^\text{th}$ oscillator in the network | Typically drawn from a Lorentzian or Gaussian distribution $g(\omega)$                                                                    |
| $K$ | *global coupling strength*                                           |                                                                                                                                           |
| $A_{i,j}$ | *adjacency matrix* topology                                          | 
| $\xi_i(t)$ | stochastic (noise) term                                              | Often modeled as additive Gaussian white noise (AGWN): $$ \big\langle \xi_i(t) \, \xi_j(t')\big\rangle = 2D\delta_{ij}\delta(t-t') \, .$$ |                                            




## The Order Parameter

### Concept Overview
The **order parameter** $r(t)$ is the primary metric for quantifying synchronization in the Kuramoto model.
It acts as a macroscopic observable that emerges from the collective microscopic interactions among the oscillators.

In the context of our benchmark suite, $r(t)$ quantifies the degree of synchronization among the oscillator population at any given moment.

---

### Mathematical Definition

The order parameter is defined via the **complex mean phasor**:

$$ z(t) = r(t) e^{i\psi(t)} = \frac{1}{N} \sum_{j=1}^N e^{i \theta_j(t)} $$

Where:

- $N$ is the total number of oscillators in the system.
- $\theta_j(t)$ is the phase of the $j^\text{th}$ oscillator.
- $r(t) = |z(t)|$ is the *magnitude* of the complex mean phasor and represents the degree of synchronization at time $t$.
- $\psi(t) = \arg{z(t)}$ is the **average phase** (center-of-mass of the phases).

!!! warning "Need to double-check with sources."

## Python Implementation
In the source code for the Kuramoto benchmark, $|r(t)|$ is computed as:

$$ r(t) = \left| \frac{1}{N} \sum_{j=1}^N e^{i \theta_j(t)} \right| $$

!!! warning "Need to double-check with sources."

!!! note "✅ To Do"
    
    - [ ] Include code snippet of implementation in `src/kuramoto/order_parameter.py`.

---

## Interpretation

### Limits of the order parameter

| **Value**     | **Interpretation** |
|:--------------| :----------------- |
| $r \approx 1$ | **Complete synchronization** |
| $r \approx 0$ | **Incoherence** |
| $0 < r < 1$   | **Partial synchronization** |

## Connection to Neuroscience

??? tip "💡 Big Idea"

    The emergence of $r(t)$ from $N$ independent units corresponds with the **binding problem** in consciousness studies:
    
    - How do discrete neural oscillators (micro) give rise to a unified conscious experience (macro)?
    - The transition from $r\approx 0$ to $r\approx 1$ represents a **phase transition**, analogous to symmetry breaking in physics.
    - In the conventional Kuramoto model, this transition occurs at a critical coupling $K_c$ where $r(t) < K_c$ corresponds with a disordered system and $r(t) > K_c$ with spontaneously emerging synchronization (ordered system).

    
    Thus, the order parameter is not only a statistical tool, but a potential bridge between statistical mechanics and theories of integrated information.

!!! warning "Personal Reflection"
    
    This is a personal reflection. The connection to neuroscience and consciousness is speculative and ill-defined. It is an area of ongoing research and debate.


## References
1. Strogatz, S. H. (2000). From Kuramoto to Crawford: Exploring the onset of synchronization in populations of coupled oscillators. Physica D: Nonlinear Phenomena, 143(1–4), 1–20. https://doi.org/10.1016/s0167-2789(00)00094-4
2. Pikovsky, A., Rosenblum, M., & Kurths, J. (2001). Synchronization: A universal concept in nonlinear sciences. Cambridge University Press.