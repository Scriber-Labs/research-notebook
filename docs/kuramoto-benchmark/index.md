# Kuramoto Benchmark Suite

## Key Features
### 1. Adaptive Integration via RKF45

!!! success "**Status:** Implemented"

??? info "Implementation Details"

    **Repo Location:**
    Inside the `simulate` method.
    
    **Code:**
    ```python
        sol = solve_ivp(..., method='RK45', ...)
    ```

### 2. 🐉 Nyquist-based adaptive step-size heuristic
!!! success "**Status:** Implemented"

??? info "Implementation Details"

    **Repo Location:**
    - Defined the `_estimate_max_step` helper method.
    - Called within `simulate`.
    
    **Logic:** Calculates the system's maximum characteristic frequency ($\lambda_{\text{max}}$).


!!! tip "For a chaotic synchronization regime, implementing Nyquist-based adaptivity was a natural choice to include in the integration scheme."



