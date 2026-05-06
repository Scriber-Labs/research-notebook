# Kuramoto Benchmark Source Code

```aiignore
kuramoto/
├── init.py
├── api.py
├── dataset.py
├── graphs.py
├── model.py
├── order_parameter.py
├── solvers.py
├── utils.py
└── validation.py
```

??? note "[`solvers.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/solvers.py)"

    - This is a thin ODE solver for the Kuramoto model.
    - It uses the `scipy.integrate.solve_ivp` function for the following task:
        
        $$ \int_{0}^{t_\text{final}}{ \frac{d\theta_i}{dt} \, dt } $$

        with user-provided RHS $f : \theta_i'= f(t,\theta_i)$ and initial conditions $\theta_i(0)=y_i(0)$.

    ??? question "Why bother wrapping SciPy's `solve_ivp`?"

        1. **Swappability:** To allow for easy implementation of integration schemes (e.g., we may want to plug in a GPU integrator, an SDE solver, or a multi-step scheme without touching the rest of the codebase). All call-sites import *this* module, never SciPy directly.
        2. **Centralized validation:** Catch bad shapes / negative tolerances once, not in every model variant.
        3. **Consistent defaults and logging hooks:** If we decide to standardize on a particular `rtol`, add a progress bar, capture solver metrics, etc., we do it here.

    ??? tip "Interface summary"
        
        | **Argument** | **Type** | **Interpretation** |
        | :----------- | :------ | :------------------ |
        | `rhs` | `Callable(t, y)` | Vector field $\dot{\theta} = f(t, \theta)$ |
        | `y0` | `(N,)` | Initial phases |
        | `t_span` | `float > 0` | Final integration time ($\mathrm{[s]}$) |
        | `t_eval` | `(T,)` | Monotonically increasing output times |
        | `rtol` | `float > 0` | Relative tolerance for adaptive RK45 |
        | `atol` | `float >= 0` | Absolute tolerance |
        | `max_step` | `float > 0` | Hard cap on step size |

??? note "[`model.py`](https://github.com/Scriber-Labs/kuramoto-benchmark-suite/blob/main/src/kuramoto/model.py)"

    This module bundles three tasks:

    1. **Parameter management**
        
        !!! success "Included rigorous and explicit validation to catch impossible configurations early."

        | **Parameter** | **Mathematical notation** |
        | :----------- | :------------------------ |
        | Network topology | $A$ |
        | Natural frequencies | $\mathbf{\omega}$ |
        | Global coupling strength | $K$ |
        | Additive noise | $\sigma$ |
        | RNG state | -- |

        
                
    2. **Numerical integration**
        - Wraps `solve_kuramoto` from `solvers.py`.
        - Nyquist-based adaptive step-size heuristic $\rightarrow$ automatically chooses a safe `max_step` for numerical integration based on the fastest time-scale. 
        - Returns a fully-typed `KuramotoDataset` ready for downstream analysis.

    3. **Derived Metrics:**
        - Phase derivatives $\mathbf{\dot{\theta}_i}$ re-evaluated on the dense output grid.
        - Kuramoto order parameter $r(t)$

    ??? info "Field overview of the returned dataset"
        
        | **Field** | **Shape** | **Meaning** | **Mathematical notation** | **Units** |
        | :-------- | :-------- | :---------- | :------------------------ | :-------- |
        | `omega` | `(N,)` | natural frequencies | $\omega_i$ | $\mathrm{[rad \ s^{-1}]}$ |
        | `theta` | `(T, N)` | phases | $\theta_i(t)$ | $\mathrm{[rad]}$ |
        | `dtheta` | `(T, N)` | angular frequencies | $\dot{\theta}_i(t)$ | $\mathrm{[rad \ s^{-1}]}$ |
        | `time` | `(T,)` | time vector | $t$ | $\mathrm{[s]}$ |
        | `initial_conditions` | `(N,)` | initial phases | $\theta_i(0)$ | $\mathrm{[rad]}$ |
        | `coupling` | `(1,)` | global coupling strength | $K$ | -- |
        | `adjacency` | `(N, N)` | network topology | $A_{i,j}$ | -- |
        | 📊 `n_nodes` | -- | number of nodes | $N$ | -- |
        | 📊 `n_edges` | -- | number of edges | $E$ | -- |
        | 📊 `avg_degree` | -- | average degree  | -- | -- |
        | 📊 `density` | -- | network density | -- | -- |
        | 📊 `...` | -- | ... | ... | -- |
        | `noise_std` | `(1,)` | additive white noise $\sigma$ on RHS | -- |
        | `freq_pdf` | `string` | frequency distribution of natural frequencies | -- |
        | `phase_pdf` | `string` | phase distribution of initial phases | -- |
        
        !!! info "📊 denotes that the field is a network statistic in the `dict` object, `network_stats`."
        
    !!! info "Notes on `KuramotoModel` class object"
        
        - No heavy allocation occurs in `__init__`; the main cost is the solver.
        - ⚠️ The class holds the *latest* simulation results. Recalling `simulate` will overwrite the cached arrays.
