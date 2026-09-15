# Computational Methods for Kuramoto Benchmark

## Numerical Discretization: Taylor Series Expansion

!!! recall "🎗️ **Recall**"

    We can numerically solve $\dot{\theta}_i(t)=f(\theta, t)$ using a Taylor series expansion to approximate the solution at $t + \Delta t$:

    $$ \theta_i(t+\Delta t) = \theta_i(t) + \dot{\theta}_i(t) \, \Delta t + \frac{1}{2}\ddot{\theta}_i(t) \, \Delta t^2 + \dots \, .$$



<div class="grid" markdown>

🟢 __Euler's Method__ Only retains the first-order term $\mathcal{O}(\Delta t)$.
{ .card }


🔴 __Runge-Kutta Methods__ Approximates higher-order terms (HOTs) via evaluation of $f$ at multiple grid points within the interval $[t, t+\Delta t] without requiring explicit HOTs.
{ .card }


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

    === "2. Nyquist-Based Integration Step Limit in Kuramoto Dynamics"

        ??? info "Overview"

            In nonlinear oscillator networks undergoing high-frequency phase evolution, standard adaptive ODE 
            integration schemes that have step sizes exceeding the **Nyquist frequency** and error tolerances that
            are satisfied purely locally are subject to **phase-slip undersampling** and numerical **aliasing**.

            Here, we address this issue by imposing a dynamic upper bound on the solver's maximum integration 
            step size (`max_step`). The upper bound is derived from the system's maximum characteristic frequency 
            $\lambda_{text{max}}$) and guarantees that even during fast transient or weakly coupled regime steps, the
            integrator samples the fastest dynamic mode with sufficient resolution.

        ??? note "Background"
            
            The **Nyquist-Shannon Sampling Theorem** states that reconstructing or resolving a continuous signal 
            requires sampling at a rate $f_s=\frac{1}{\Delta t}$ that is strcitly greater than twice the highest 
            frequency component present in the signal ($f_\text{max}$) called the **Nyquist rate**:

            $$ f_s > 2f_\text{max} \implies \Delta t < \frac{T_\text{min}}{2} = \frac{\pi}{\omega_\text{max}} \, . $$
            
            In the context of numerical integration of ordinary differential equations (such as Kuramoto phase 
            oscillators $\dot{\theta}_i=\omega_i + \frac{K}{N} \sum_j{A_{ij}\sin(\theta_j-\theta_i})$ ):

            - The fastest effective timescale is governed not only by the maximum frequency 
                $\omega_\text{max} = \max_i \| \omega_i \|$, but also the maximum *coupling torque*
                $\propto K \cdot \deg_\text{max}$.

            - Setting a step size limmit based on this fastest scale ensures that the numerical trajectory does not 
                skip cycles ($2\pi$ phase wraps) beteween solver evaluations.

            - In order to to maintain numerical stability and high integration accuracy in Runge-Kutta schemes 
                (e.g., RK45), the step size should be limited to a conservative fraction of the minimum intrinsic 
                frequency (e.g., 20 steps per period), comfortably exceeding the theoretical minimum Nyquist threshold 
                of 2 steps per period.

        ??? Implementation

            The step-size limit is implemented in [`src/kuramoto/model.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/model.py) 
            as follows:

            1. **Upper bound estimation (`KuramotoModel._max_step`)**

                Inside `src/kuramoto/model.py`:

                - Constant `_STEP_PER_PERIOD = 20` defines the oversampling factor per cycle.
                
                - The method `_max_step()` computes the maximum rate:

                    ```python
                    """Heuristic step bound based on fasted eigen-frequency."""
                    omega_max = float(np.max(np.abs(self.omega)))
                    deg_max   = int(np.max(np.sum(self.A > 0, axis=1)))
                    lambda_max = omega_max * self.K * deg_max
                    return np.inf if lambda_max == 0 else (2 * np.pi / lambda_max) / self._STEPS_PER_PERIOD
                    ```

            2. **Model Simulation (`KuramotoModel.simulate`)**
 
                When running `model.simulate(t_span, n_points)`:

                - `max_step` is computed dynamically from current craph topology and parameters:

                    ```python
                    max_step = self.max_step()
                    sol = solve_kuramoto(
                        rhs=self._rhs,
                        y0=self.initial_phase,
                        t_span=t_span,
                        t_eval=t_eval,
                        rtol=self._RTOL,
                        atol=self._ATOL,
                        max_step=max_step,
                    )
                    ```

            3. **Solver Enforcement (`sovlers.solve_kuramoto`)**
                
                Inside [`src/kuramoto/solvers.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/solvers.py):

                - `solve_kuramoto` validates `max_step` and passes it directly to SciPy's `solve_ivp`:

                    ```python
                    return solve_ivp(
                        fun=rhs,
                        t_span=(0.0, t_span),
                        y0=y0,
                        method=_DEFAULT_METHOD,
                        t_eval=t_eval,
                        rtol=rtol,
                        atol=atol,
                        max_step=max_step if max_step is not None else np.inf,
                    )
                    ```

                - This forces SciPy's adaptive RK45 engine to constrain every internal step $h_n \leq \max_\text{step}$, 
                  preventing excessive step sizes and ensuring a robust trajectory resolution across arbitrary network 
                  topologies.



