export default function (Alpine) {
    document.addEventListener('alpine:init', () => {
        let body = document.querySelector('body');
        body.innerHTML = `<div style="display: none;" x-bind:class="$store.tour.active ? '' : 'hidden'" class="absolute z-10 inset-0" aria-labelledby="modal-title" role="dialog" aria-modal="true" x-show="$store.tour.active" x-data>
                      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
                          x-transition:enter="ease-out duration-300"
                          x-transition:enter-start="opacity-0"
                          x-transition:enter-end="opacity-100"
                          x-transition:leave="ease-in duration-200"
                          x-transition:leave-start="opacity-100"
                          x-transition:leave-end="opacity-0"></div>
                          
                      <div style="transform: translateX(0)">
                      <div x-bind:style="$store.tour.style" class="fixed inline-block align-bottom rounded-lg px-4 pt-3 pb-3 text-left transform transition-all sm:align-middle max-w-xs w-full bg-white"
                          x-transition:enter="transition ease-out duration-300"
                          x-transition:enter-start="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          x-transition:enter-end="transform opacity-100 translate-y-0 sm:scale-100"
                          x-transition:leave="transition ease-in duration-200"
                          x-transition:leave-start="transform opacity-100 translate-y-0 sm:scale-100"
                          x-transition:leave-end="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                          
                            <div class="absolute w-3 h-3" x-bind:style="$store.tour.dotStyle">
                                <div class="w-2 h-2 rounded-full bg-orange-500 absolute" style="top: calc(0.25rem/2); left: calc(0.25rem/2)"></div>
                                <div class="w-3 h-3 rounded-full bg-orange-400 animate-ping absolute"></div>
                            </div>
                            <div x-show="$store.tour.activeStep?.modifier === 'bottom'" class="w-6 overflow-hidden inline-block absolute" style="top: -1rem; left: 50%; transform: translateX(-50%)">
                             <div class=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left"></div>
                            </div>
                            <div x-show="$store.tour.activeStep?.modifier === 'top'" class="w-6 overflow-hidden inline-block absolute" style="bottom: -1rem; left: 50%; transform: translateX(-50%)">
                             <div class=" h-4 w-4 bg-white -rotate-45 transform origin-top-left"></div>
                            </div>
                            <div x-show="$store.tour.activeStep?.modifier === 'right'" class="w-4 overflow-hidden inline-block absolute" style="left: -1rem; top: 50%; transform: translateY(-50%)">
                             <div class=" h-6 bg-white -rotate-45 transform origin-top-right"></div>
                            </div>
                            <div x-show="$store.tour.activeStep?.modifier === 'left'" class="w-4 overflow-hidden inline-block absolute" style="right: -1rem; top: 50%; transform: translateY(-50%)">
                             <div class=" h-6 bg-white rotate-45 transform origin-top-left"></div>
                            </div>
                          <div class="hidden sm:block absolute top-1 right-1">
                              <button x-on:click="$store.tour.stop()" type="button" class="rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-none">
                                  <span class="sr-only">Close</span>
                                  <!-- Heroicon name: outline/x -->
                                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                              </button>
                          </div>
                          <div class="gap-3">
                            <div class="font-bold" x-text="$store.tour.activeStep?.title"></div>
                            <div x-text="$store.tour.activeStep?.description"></div>
                          </div>
                          <div class="flex justify-between mt-3">
                            <div>
                                <span x-text="$store.tour.step + 1"></span> / <span x-text="$store.tour.steps.length"></span>
                            </div>
                            <div class="gap-3">
                                <button class="text-sm disabled:text-gray-300 text-gray-700 mr-3" x-on:click="$store.tour.decreaseStep()" x-bind:disabled="$store.tour.step === 0"><< <span x-text="$store.tourtranslations.previous"></span></button>
                                <button class="text-sm disabled:text-gray-300 text-gray-700" x-on:click="$store.tour.increaseStep()" x-show="($store.tour.steps.length - 1) !== $store.tour.step"><span x-text="$store.tourtranslations.next"></span> >></button>
                                <button class="text-sm disabled:text-gray-300 text-gray-700" x-on:click="$store.tour.stop()" x-show="($store.tour.steps.length - 1) === $store.tour.step"><span x-text="$store.tourtranslations.finish"></span></button>
                            </div>
                          </div>
                      </div>
                      </div>
                  </div>
        ` + body.innerHTML;

        document.addEventListener('keyup', (e) => {
            const tour = Alpine.store('tour');
            if (tour.active) {
                if(e.key === 'ArrowLeft') {
                    if (tour.step !== 0) {
                        tour.decreaseStep();
                    }
                } else if (e.key === 'ArrowRight') {
                    if (tour.step !== tour.steps.length -1) {
                        tour.increaseStep();
                    }
                } else if (e.key === 'Escape') {
                    tour.stop();
                }
            }
        })

        Alpine.store('tourtranslations', {
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish'
        })

        Alpine.store('tour', {
            step: 0,
            active: false,
            steps: [],
            activeStep: null,
            style: '',
            dotStyle: '',
            calculatePosition() {
                const rect = this.activeStep.el.getBoundingClientRect();
                this.activeStep.el.style.zIndex = 999999;

                switch(this.activeStep.modifier) {
                    case 'top':
                        this.style = `top: calc(${(rect.top + window.scrollY)}px - 0.75rem); left: ${(rect.left + window.scrollX) + (rect.width / 2)}px; transform: translate(-50%, calc(-100% - 0.75rem));`;
                        this.dotStyle = `left: 50%; top: calc(100% + 0.75rem); transform: translateX(-50%);`;
                        break;
                    case 'bottom':
                        this.style = `top: calc(${(rect.bottom + window.scrollY)}px + 0.75rem); left: ${(rect.left + window.scrollX) + (rect.width / 2)}px; transform: translate(-50%, 0.75rem);`;
                        this.dotStyle = `left: 50%; top: -1.5rem; transform: translateX(-50%);`;
                        break;
                    case 'left':
                        this.style = `top: ${(rect.top + window.scrollY) + (rect.height / 2)}px; left: calc(${(rect.left + window.scrollX)}px - 0.75rem); transform: translate(calc(-100% - 0.75rem), -50%)`;
                        this.dotStyle = `left: calc(100% + 0.75rem); top: 50%; transform: translateY(-50%);`;
                        break;
                    case 'right':
                        this.style = `top: ${(rect.top + window.scrollY) + (rect.height / 2)}px; left: calc(${(rect.right + window.scrollX)}px + 0.75rem); transform: translate(0.75rem, -50%)`;
                        this.dotStyle = `left: -1.5rem; top: 50%; transform: translateY(-50%);`;
                        break;
                }
            },
            increaseStep() {
                this.step++;
                this.activeStep = this.steps[this.step];
                this.calculatePosition();
            },
            decreaseStep() {
                this.step--;
                this.activeStep = this.steps[this.step];
                this.calculatePosition();
            },
            resetStep() {
                this.step = 0;
                this.activeStep = null;
            },
            start() {
                this.active = true;
                this.activeStep = this.steps[this.step];
                this.calculatePosition();
            },
            stop() {
                this.active = false;
                this.resetStep();
            }
        });

        Alpine.directive('tour', (el, { modifiers, expression }, { evaluateLater, effect }) => {
            const tour = Alpine.store('tour');

            let modifier = modifiers.shift();
            if (~['top', 'bottom', 'left', 'right'].indexOf(modifier)) {
                const getContent = evaluateLater(expression);

                getContent((content) => {
                    tour.steps.push({
                        step: content.step ?? 1,
                        title: content.title ?? '',
                        description: content.description ?? '',
                        modifier: modifier ?? 'top',
                        el: el,
                    });

                    tour.steps.sort((a, b) => {
                        return a.step - b.step;
                    });
                });
            } else if (modifier === 'start') {
                el.addEventListener('click', () => {
                    tour.start();
                });
            } else if (modifier === 'stop') {
                el.addEventListener('click', () => {
                    tour.stop();
                });
            } else {
                throw 'Undefined modifier';
            }
        });
    });
}
