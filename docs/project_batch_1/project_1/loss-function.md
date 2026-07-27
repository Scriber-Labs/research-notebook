# Project 1 Loss Function

!!! eigenote "**Variationally Motivated Loss Function**"

    Rather than solving the equations of motion exactly, the **Euler-Lagrange residual** 

    $$
    \mathcal{L}_\text{phys} = \Biggl\langle  \bigg(
    \frac{d}{dt} \frac{\partial {L}}{\partial \dot{q}} - \frac{\partial L}{\partial q} \bigg)^2 \Biggr\rangle
    $$

    is penalized at collocation points in time. Here, $L$ denotes the *Lagrangian* of the system. For project 1,
    the mass and spring constant are normalized so that the above equation can be simplified to
   
    $$
    \mathcal{L}_\text{phys} = \bigl\langle (\ddot{q} + \omega^2 q)^2 \bigr\rangle \, .
    $$

    This loss function encourages the system to respect physical dynamics according to the 
    Euler-Lagrange equations.

!!! eigenote "**Note on Low Fidelity**"

    Soft contraints correspond with low fidelity. This is because the physical dynamics we want the model to respect are
    not directly enforced. Specificlally, the residual of the stationary condition of the action is minimized rather than
    the action itself.