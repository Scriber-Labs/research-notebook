# Project Batch 1: Low-Fidelity Physics Informed Machine Learning

!!! important "__✨ Interpretability is the primary focus! ✨__"

    These projects emphasize interpretability over benchmark performance.

    A successful experiment is therefore not defined solely by a low loss value, but by whether the resulting diagnostics support a coherent physical interpretation.



!!! eigenote "__Project Batch Overview__"

    ??? eignote "__Project 1 Overview__"

        **Project 1** investigates whether a neural network can recover physically meaningful  trajectories by minimizing a variational physics residual rather than fitting data directly.

        !!! eigenote "__Key Idea__"

            - Enforce Euler-Lagrange structure through a soft constraint on the equation of motion.

        !!! eigenote "__Focus__"

            - forward modeling
            - variational loss functions
            - spectral bias and training stability

    ??? eignote "__Project 2 Overview__"

        **Project 2** builds on this by asking what information remains identifiable in the context of a deliberately imperfect inverse problem.

        !!! eigenote "__Key Idea__"

            - Recover wavefunctions and potentials from noisy observations.

        !!! eigenote "__Focus__"

            - inverse operator learning
            - wavefunction reconstruction
            - identifiability of quantum states
            - normalization and stability constraints

    ??? eigenote "__Project 3 Overview__"    

        **Project 3** reframes Hamiltonian learning as a self-consistent field problem.

        !!! eigenote "__Key Idea__"

            - The Hamiltonian is updated iteratively from its own induced quantum states, forming a fixed-point learning system.

        !!! eigenote "__Focus__"

            - SCF-style fixed-point iteration (inspired by DFT / PySCF)
            - Hamiltonian inference from noisy observables
            - weak symplectic regularization
            - POD-based structure discovery in learned state spaces

!!! eigenote "__Unifying Theme__"

    Across all three projects, the central question is:

    How does physical structure emerge in neural systems when constraints are enforced only approximately rather than exactly?

    Each project explores a different aspect of this question:

    - forward dynamics (Project 1)
    - inverse wavefunction reconstruction (Project 2)
    - self-consistent operator learning (Project 3)

!!! eigenote "__Methodological Continuity__"

    All projects share:

    - low-fidelity physics-informed neural networks
    - emphasis on interpretability over benchmark performance
    - small, exactly simulable systems
    - diagnostic-first evaluation philosophy

!!! eigenote "__Long-Term Direction__"

    This series serves as a foundation for exploring:
    - structure-preserving machine learning
    - inverse problems in quantum and classical systems
    - emergent geometry in learned physical systems

!!! summary "__Project Batch 1 Github Repositories__"
    <div class="center-button" markdown>
    [🔗 Project 1](https://github.com/Scriber-Labs/lf-pinn-harmonic-oscillator){ .md-button .md-button--primary }
    </div>

    <div class="center-button" markdown>
    [🔗 Project 2](https://github.com/Scriber-Labs/lf-pinn-inverse-schrodinger){ .md-button .md-button--primary }
    </div>

    !!! note "Thank you for your patience!"
        Project 3 is still under development and project 1 and 2 artifacts are still being polished. 






