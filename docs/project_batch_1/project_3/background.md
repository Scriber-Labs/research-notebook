# Background



!!! eigenote "Quantum Symplectic Structure"

    Though our system is comprised of discrete qubits ($\therefore \, \dim{H} = 2^n$), we leverage naturally emerging 
    symplectic geometry that is admitted by quantum systems via a **real-partition parameterization**:

    $$
    \psi = u + i v \, \rightarrow \, Z = (u, v)^T \in \mathcal{R}^{2^{n+1}} \, ,
    $$

    and the fact that **Schrödinger flow** satisfies

    $$
        J \dot{Z} = \nabla_Z H(Z) 
    $$
    
    with **canonical symplectic form**
    
    $$
        J = \begin{bmatrix}
                0 & 1 \\
                -1 & 0
            \end{bmatrix} \, .
    $$

    The steps we use to exploit these features are:

    - Computing time derivatives $\dot{Z}$ during *forward pass*.
    - Adding a **residual penalty** 
        
        $$
        \| \dot{Z} - \nabla_Z H(Z) \|^2
        $$

        to $\mathcal{L}_\text{phys}$.
    - Interpreting POD modes in $Z$-space as **symplectically-constrained trajectory variations**.


    This maintains low-fidelity character (e.g., no full geometric integrator) while grounding regularization in actual 
    quantum mechanical geometry rather than heuristic smoothing.


