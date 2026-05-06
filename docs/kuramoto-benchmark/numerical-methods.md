# Computational Methods for Kuramoto Benchmark

## 🎗️ Numerical Discretization: Taylor Series Expansion
We can numerically solve $\dot{\theta}_i(t)=f(\theta, t)$ using a Taylor series expansion to approximate the solution at $t + \Delta t$:

$$ \theta_i(t+\Delta t) = \theta_i(t) + \dot{\theta}_i(t) \, \Delta t + \frac{1}{2}\ddot{\theta}_i(t) \, \Delta t^2 + \dots \, .$$

<div class="grid cards" markdown>

- 🟢 {.lg .middle } __Euler's Method__

    ---

    Only retains the first-order term $\mathcal{O}(\Delta t)$.

- 🔴 {.lg .middle } __Runge-Kutta Methods__

    ---

    Approximates higher-order terms (HOTs) via evaluation of $f$ at multiple grid points within the interval $[t, t+\Delta t] without requiring explicit HOTs.

</div>

## Numerical Methods Implemented in the Kuramoto Benchmark

!!! abstract "Adaptive Integration via RK45"

    === "1. RK45: The Dormand-Prince Method"

        ??? info "Implementation"

            - Implemented as an embedded method in [`src/kuramoto/model.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/model.py).
            - For each time step, it computes two estimates of the next state:
                
                1. A fourth-order estimate $\theta[t_{k+1}]$.
                2. A fifth-order estimate $\hat{\theta}[t_{k+1}]$.

            - Estimated error is $$ \epsilon = \| \hat{\theta}[t_{k+1}] - \theta[t_{k+1}] \| $$

                !!! warning "Double-check the accuracy of this description."

                ??? info "Adaptive Step-Size Logic"

                    The step size $\Delta t$ is dynamically adjusted so that the error $\epsilon$ stays below a tolerance $\tau = \text{atol} + \text{rtol} \cdot \|\theta[t_k]\|$:

                    - If $\epsilon > \tau$, then reject the step and decrease $\Delta t$.
                    - If $\epsilon \ll \tau$, then accept the step and increase $\Delta t$ for the next iteration.

        ??? tip "🚨 Significance for Kuramoto Benchmark"
            
            The adaptive step size logic is important because it prevents the dynamics from becoming "stiff" when the order parameter $r(t)$ reaches the synchronization threshold.

    === "2. Nyquist-based Adaptive Step Size Heuristic"

        ??? info "Overview"

            - **Logic:** Calculates the system's maximum characteristic frequency ($\lambda_{\text{max}}$).
            - **Justification:** For a chaotic synchronization regime, implementing Nyquist-based adaptivity in the integration scheme can help prevent aliasing.

                !!! warning "This extension was an idea suggested by the author and engineered with LLM assistance."
                    
                    - [ ] Further details on this Nyquist-based extension need to be explored by the author.
                    - [ ] The implementation details in the code itself still need to be reviewed by the author.

        ??? info "Implementation Details"

            - Implemented in [`src/kuramoto/model.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/model.py).
            - Called in the `simulate` method using the `_max_step` helper.


