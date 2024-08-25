'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">awesome_todo-list documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' : 'data-bs-target="#xs-controllers-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' :
                                            'id="xs-controllers-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' : 'data-bs-target="#xs-injectables-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' :
                                        'id="xs-injectables-links-module-AppModule-719143984cc299aeb5cb59a0390c583b269f8effa4941a5fe0474e8ba8973d1fd192d7612e9f680547c7a9d9e70be7582ca86b77850348855bd16e9f81020521"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsUniqueConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUniqueConstraint</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TaskModule.html" data-type="entity-link" >TaskModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' : 'data-bs-target="#xs-controllers-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' :
                                            'id="xs-controllers-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' }>
                                            <li class="link">
                                                <a href="controllers/TaskController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' : 'data-bs-target="#xs-injectables-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' :
                                        'id="xs-injectables-links-module-TaskModule-97ad367ca57a05f9f3232dfed44c46608fa4517b6b2ee50ae1b04a223ca38f94d3c8dd880e2709f454f88d3a0085543a75a813b9c2243df3421a713205d2917a"' }>
                                        <li class="link">
                                            <a href="injectables/TaskService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' : 'data-bs-target="#xs-controllers-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' :
                                            'id="xs-controllers-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' : 'data-bs-target="#xs-injectables-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' :
                                        'id="xs-injectables-links-module-UserModule-6393733d2959574400c079c537b71b07ff84142187442c8053aac4fa771c15563680f5dadcff52a795b1462dc0063e850aadb5c467f0e655e772c1748f344a6f"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TaskController.html" data-type="entity-link" >TaskController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Task.html" data-type="entity-link" >Task</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TaskResponseDto.html" data-type="entity-link" >TaskResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskStatusDto.html" data-type="entity-link" >UpdateTaskStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsUniqueConstraint.html" data-type="entity-link" >IsUniqueConstraint</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskService.html" data-type="entity-link" >TaskService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});