document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // Timer Logic
    // -----------------------------------------
    let countdownInterval;
    let secondsRemaining = 0;

    const display = document.getElementById('timer-display');
    const btn5m = document.getElementById('btn-5m');
    const btn10m = document.getElementById('btn-10m');
    const btn15m = document.getElementById('btn-15m');
    const btnStop = document.getElementById('btn-stop');

    // Audio context and sounds using Web Audio API to avoid loading external files
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playBeep(frequency, type, duration, vol) {
        if(audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + duration);
    }

    function playStartSound() {
        // A rising two-tone beep
        playBeep(440, 'sine', 0.2, 0.5);
        setTimeout(() => playBeep(660, 'sine', 0.4, 0.5), 200);
    }

    function playEndSound() {
        // A success melody or multi-beep
        playBeep(523.25, 'triangle', 0.3, 0.5); // C5
        setTimeout(() => playBeep(659.25, 'triangle', 0.3, 0.5), 200); // E5
        setTimeout(() => playBeep(783.99, 'triangle', 0.6, 0.5), 400); // G5
    }

    function updateDisplay(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer(minutes) {
        clearInterval(countdownInterval);
        secondsRemaining = minutes * 60;
        updateDisplay(secondsRemaining);
        
        playStartSound();
        
        btnStop.style.display = 'inline-flex';

        countdownInterval = setInterval(() => {
            secondsRemaining--;
            if (secondsRemaining < 0) {
                clearInterval(countdownInterval);
                display.textContent = "00:00";
                playEndSound();
                btnStop.style.display = 'none';
            } else {
                updateDisplay(secondsRemaining);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(countdownInterval);
        secondsRemaining = 0;
        updateDisplay(0);
        btnStop.style.display = 'none';
    }

    btn5m.addEventListener('click', () => startTimer(5));
    btn10m.addEventListener('click', () => startTimer(10));
    btn15m.addEventListener('click', () => startTimer(15));
    btnStop.addEventListener('click', stopTimer);

    // -----------------------------------------
    // Chart.js - Progress Chart
    // -----------------------------------------
    const ctx = document.getElementById('progressChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ciclo 1', 'Ciclo 2', 'Ciclo 3', 'Ciclo 4 (16 Días)'],
                datasets: [
                    {
                        label: 'Nivel de Dolor',
                        data: [8, 6.5, 4.5, 2.5],
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    },
                    {
                        label: 'Fuerza Muscular',
                        data: [3, 4.5, 6, 8],
                        borderColor: '#10B981',
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        borderDash: [5, 5],
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#F1F5F9',
                            font: { family: 'Outfit', size: 14 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0B0F19',
                        titleColor: '#F1F5F9',
                        bodyColor: '#F1F5F9',
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        ticks: { color: '#94A3B8' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    x: {
                        ticks: { color: '#94A3B8' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // -----------------------------------------
    // Scroll To Top Button Logic
    // -----------------------------------------
    const scrollBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        
        // Scroll To Top Button
        if (scrollBtn) {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // -----------------------------------------
    // Wizard Logic
    // -----------------------------------------
    const dayTabs = document.querySelectorAll('.wizard-tab');
    const wizardDays = document.querySelectorAll('.wizard-day');
    
    // Handle Day Tab Switching
    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Mostrar de nuevo el contenedor si estaba oculto
            document.querySelector('.wizard-content-container').style.display = 'block';
            
            dayTabs.forEach(t => t.classList.remove('active'));
            wizardDays.forEach(d => d.classList.remove('active'));
            
            tab.classList.add('active');
            const dayId = 'day-' + tab.getAttribute('data-day');
            const targetDay = document.getElementById(dayId);
            if (targetDay) {
                targetDay.classList.add('active');
                
                // Reset to Step 1
                const steps = targetDay.querySelectorAll('.step-content');
                const dots = targetDay.querySelectorAll('.step-dot');
                if (steps.length > 0) {
                    steps.forEach(s => s.classList.remove('active'));
                    dots.forEach(d => d.classList.remove('active'));
                    steps[0].classList.add('active');
                    dots[0].classList.add('active');
                }
            }
        });
    });

    // Handle Next/Prev Step Buttons
    document.querySelectorAll('.next-step, .prev-step').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentDay = e.target.closest('.wizard-day');
            const currentStepContent = e.target.closest('.step-content');
            const allSteps = Array.from(currentDay.querySelectorAll('.step-content'));
            const allDots = Array.from(currentDay.querySelectorAll('.step-dot'));
            
            const currentIndex = allSteps.indexOf(currentStepContent);
            let nextIndex = currentIndex;
            
            if (e.target.classList.contains('next-step')) {
                nextIndex = currentIndex + 1;
            } else if (e.target.classList.contains('prev-step')) {
                nextIndex = currentIndex - 1;
            }
            
            if (nextIndex >= 0 && nextIndex < allSteps.length) {
                allSteps.forEach(s => s.classList.remove('active'));
                allDots.forEach(d => d.classList.remove('active'));
                
                allSteps[nextIndex].classList.add('active');
                
                for(let i = 0; i <= nextIndex; i++) {
                    allDots[i].classList.add('active');
                }
                
                // Hacer scroll suave hacia arriba de la sección ciclo
                document.getElementById('ciclo').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Finish Day button
    document.querySelectorAll('.finish-day').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('¡Excelente trabajo! Has completado tu rutina por hoy. 🎉');
            
            // Ocultar el panel de contenido
            document.querySelector('.wizard-content-container').style.display = 'none';
            
            // Quitar la selección del día activo en las pestañas
            document.querySelectorAll('.wizard-tab').forEach(t => t.classList.remove('active'));
            
            // Hacer scroll suave hacia las pestañas para que el usuario vea dónde reabrir
            document.querySelector('.wizard-tabs').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Inline Timers
    document.querySelectorAll('.start-timer-inline').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mins = parseInt(e.currentTarget.getAttribute('data-mins'));
            if (!isNaN(mins)) {
                startTimer(mins);
                // Also expand the timer if it's collapsed so they can see it running
                setTimerState(false);
            }
        });
    });

    // -----------------------------------------
    // Interactive Checklist & Step Navigation
    // -----------------------------------------
    
    // 1. Interactive Checkboxes
    document.querySelectorAll('.task-check').forEach(chk => {
        chk.addEventListener('change', (e) => {
            const item = e.target.closest('.task-item');
            if (e.target.checked) {
                item.classList.add('completed');
                
                // Find next task in the same step
                const nextItem = item.nextElementSibling;
                if (nextItem && nextItem.classList.contains('task-item')) {
                    // Slight delay for UX
                    setTimeout(() => {
                        nextItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                } else {
                    // No more tasks, highlight the Next button
                    const nextBtn = item.closest('.step-content').querySelector('.next-step, .finish-day');
                    if (nextBtn) {
                        setTimeout(() => {
                            nextBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            // Optional: pulsate the button
                            nextBtn.style.transform = 'scale(1.05)';
                            setTimeout(() => nextBtn.style.transform = 'scale(1)', 200);
                        }, 300);
                    }
                }
            } else {
                item.classList.remove('completed');
            }
        });
    });

    // 2. Clickable Step Indicators
    document.querySelectorAll('.step-dot.clickable').forEach(dot => {
        dot.addEventListener('click', (e) => {
            const targetStep = parseInt(e.target.getAttribute('data-step'));
            const currentDay = e.target.closest('.wizard-day');
            if (!currentDay) return;
            
            const allSteps = Array.from(currentDay.querySelectorAll('.step-content'));
            const allDots = Array.from(currentDay.querySelectorAll('.step-dot'));
            
            if (targetStep > 0 && targetStep <= allSteps.length) {
                allSteps.forEach(s => s.classList.remove('active'));
                allDots.forEach(d => d.classList.remove('active'));
                
                allSteps[targetStep - 1].classList.add('active');
                
                for(let i = 0; i < targetStep; i++) {
                    allDots[i].classList.add('active');
                }
            }
        });
    });

    // -----------------------------------------
    // Timer Collapse & Swipe Logic
    // -----------------------------------------
    const timerContainer = document.getElementById('timer-container');
    const timerToggleBtn = document.getElementById('timer-toggle-btn');
    const timerCloseBtn = document.getElementById('timer-close-btn');
    const timerCardDOM = document.getElementById('timer-card');

    function setTimerState(isCollapsed) {
        if (!timerContainer || !timerToggleBtn) return;
        if (isCollapsed) {
            timerContainer.classList.add('collapsed');
            timerToggleBtn.classList.add('visible');
        } else {
            timerContainer.classList.remove('collapsed');
            timerToggleBtn.classList.remove('visible');
        }
        localStorage.setItem('timerCollapsed', isCollapsed ? 'true' : 'false');
    }

    // Initial load state
    // Por defecto es true (oculto) a menos que explícitamente se haya guardado como false (abierto)
    if (localStorage.getItem('timerCollapsed') === 'false') {
        setTimerState(false);
    } else {
        setTimerState(true);
    }

    if (timerCloseBtn) {
        timerCloseBtn.addEventListener('click', () => setTimerState(true));
    }
    if (timerToggleBtn) {
        timerToggleBtn.addEventListener('click', () => setTimerState(false));
    }

    // Swipe gesture (Touch & Mouse)
    let pointerStartX = 0;
    let pointerEndX = 0;

    if (timerCardDOM) {
        timerCardDOM.addEventListener('pointerdown', e => {
            pointerStartX = e.clientX;
        }, { passive: true });

        timerCardDOM.addEventListener('pointerup', e => {
            pointerEndX = e.clientX;
            // If swiped right by more than 40px
            if (pointerEndX - pointerStartX > 40) {
                setTimerState(true);
            }
        }, { passive: true });
    }

});
