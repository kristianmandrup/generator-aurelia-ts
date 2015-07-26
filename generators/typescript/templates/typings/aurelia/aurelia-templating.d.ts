declare module 'aurelia-templating' {
  import core from 'core-js';
  import * as LogManager from 'aurelia-logging';
  import { Metadata, Origin, Decorators }  from 'aurelia-metadata';
  import { relativeToFile }  from 'aurelia-path';
  import { Container }  from 'aurelia-dependency-injection';
  import { Loader, TemplateRegistryEntry }  from 'aurelia-loader';
  import { bindingMode, ObserverLocator, ValueConverterResource, EventManager }  from 'aurelia-binding';
  import { TaskQueue }  from 'aurelia-task-queue';
  export const animationEvent: any;
  export class Animator {
    static configureDefault(container: any, animatorInstance: any): any;
    move(): any;
    
    /**
       * Execute an 'enter' animation on an element
       * 
       * @param element {HTMLElement}         Element to animate
       * 
       * @returns {Promise}                   Resolved when the animation is done
       */
    enter(element: any): any;
    
    /**
       * Execute a 'leave' animation on an element
       * 
       * @param element {HTMLElement}         Element to animate
       * 
       * @returns {Promise}                   Resolved when the animation is done
       */
    leave(element: any): any;
    
    /**
       * Add a class to an element to trigger an animation.
       * 
       * @param element {HTMLElement}         Element to animate
       * @param className {String}            Properties to animate or name of the effect to use
       * 
       * @returns {Promise}                   Resolved when the animation is done
       */
    removeClass(element: any, className: any): any;
    
    /**
       * Add a class to an element to trigger an animation.
       * 
       * @param element {HTMLElement}         Element to animate
       * @param className {String}            Properties to animate or name of the effect to use
       * 
       * @returns {Promise}                   Resolved when the animation is done
       */
    addClass(element: any, className: any): any;
    
    /**
       * Execute a single animation.
       * 
       * @param element {HTMLElement}         Element to animate
       * @param className {Object|String}    Properties to animate or name of the effect to use
       *                                      For css animators this represents the className to 
       *                                      be added and removed right after the animation is done
       * @param options {Object}              options for the animation (duration, easing, ...)
       * 
       * @returns {Promise}                   Resolved when the animation is done
       */
    animate(element: any, className: any, options: any): any;
    
    /**
       * Run a sequence of animations one after the other.
       * for example : animator.runSequence("fadeIn","callout")
       * 
       * @param sequence {Array}          An array of effectNames or classNames
       * 
       * @returns {Promise}               Resolved when all animations are done
       */
    runSequence(sequence: any): any;
    
    /**
       * Register an effect (for JS based animators)
       * 
       * @param effectName {String}          name identifier of the effect
       * @param properties {Object}          Object with properties for the effect
       * 
       */
    registerEffect(effectName: any, properties: any): any;
    
    /**
       * Unregister an effect (for JS based animators)
       * 
       * @param effectName {String}          name identifier of the effect
       */
    unregisterEffect(effectName: any): any;
  }
  export function hyphenate(name: any): any;
  export function nextElementSibling(element: any): any;
  export class ViewStrategy {
    static metadataKey: any;
    makeRelativeTo(baseUrl: any): any;
    static normalize(value: any): any;
    static getDefault(target: any): any;
  }
  export class UseViewStrategy extends ViewStrategy {
    constructor(path: any);
    loadViewFactory(viewEngine: any, options: any): any;
    makeRelativeTo(file: any): any;
  }
  export class ConventionalViewStrategy extends ViewStrategy {
    constructor(moduleId: any);
    loadViewFactory(viewEngine: any, options: any): any;
    static convertModuleIdToViewUrl(moduleId: any): any;
  }
  export class NoViewStrategy extends ViewStrategy {
    loadViewFactory(): any;
  }
  export class TemplateRegistryViewStrategy extends ViewStrategy {
    constructor(moduleId: any, registryEntry: any);
    loadViewFactory(viewEngine: any, options: any): any;
  }
  export class BindingLanguage {
    inspectAttribute(resources: any, attrName: any, attrValue: any): any;
    createAttributeInstruction(resources: any, element: any, info: any, existingInstruction: any): any;
    parseText(resources: any, value: any): any;
  }
  export class ResourceRegistry {
    constructor();
    registerElement(tagName: any, behavior: any): any;
    getElement(tagName: any): any;
    registerAttribute(attribute: any, behavior: any, knownAttribute: any): any;
    getAttribute(attribute: any): any;
    registerValueConverter(name: any, valueConverter: any): any;
    getValueConverter(name: any): any;
  }
  export class ViewResources extends ResourceRegistry {
    constructor(parent: any, viewUrl: any);
    relativeToView(path: any): any;
    getElement(tagName: any): any;
    mapAttribute(attribute: any): any;
    getAttribute(attribute: any): any;
    getValueConverter(name: any): any;
  }
  
  // NOTE: Adding a fragment to the document causes the nodes to be removed from the fragment.
  // NOTE: Adding to the fragment, causes the nodes to be removed from the document.
  export class View {
    constructor(fragment: any, behaviors: any, bindings: any, children: any, systemControlled: any, contentSelectors: any);
    created(executionContext: any): any;
    bind(executionContext: any, systemUpdate: any): any;
    addBinding(binding: any): any;
    unbind(): any;
    insertNodesBefore(refNode: any): any;
    appendNodesTo(parent: any): any;
    removeNodes(): any;
    attached(): any;
    detached(): any;
  }
  export class ContentSelector {
    static applySelectors(view: any, contentSelectors: any, callback: any): any;
    constructor(anchor: any, selector: any);
    copyForViewSlot(): any;
    matches(node: any): any;
    add(group: any): any;
    insert(index: any, group: any): any;
    removeAt(index: any, fragment: any): any;
  }
  export class ViewSlot {
    constructor(anchor: any, anchorIsContainer: any, executionContext: any, animator?: any);
    transformChildNodesIntoView(): any;
    bind(executionContext: any): any;
    unbind(): any;
    add(view: any): any;
    insert(index: any, view: any): any;
    remove(view: any): any;
    removeAt(index: any): any;
    removeAll(): any;
    swap(view: any): any;
    attached(): any;
    detached(): any;
    installContentSelectors(contentSelectors: any): any;
    contentSelectorAdd(view: any): any;
    contentSelectorInsert(index: any, view: any): any;
    contentSelectorRemove(view: any): any;
    contentSelectorRemoveAt(index: any): any;
    contentSelectorRemoveAll(): any;
  }
  export class BoundViewFactory {
    constructor(parentContainer: any, viewFactory: any, executionContext: any);
    create(executionContext: any): any;
  }
  export class ViewFactory {
    constructor(template: any, instructions: any, resources: any);
    create(container: any, executionContext: any, options?: any): any;
  }
  export class ViewCompiler {
    static inject(): any;
    constructor(bindingLanguage: any);
    compile(templateOrFragment: any, resources: any, options?: any): any;
    compileNode(node: any, resources: any, instructions: any, parentNode: any, parentInjectorId: any, targetLightDOM: any): any;
    compileElement(node: any, resources: any, instructions: any, parentNode: any, parentInjectorId: any, targetLightDOM: any): any;
  }
  export class ViewEngine {
    static inject(): any;
    constructor(loader: any, container: any, viewCompiler: any, moduleAnalyzer: any, appResources: any);
    loadViewFactory(urlOrRegistryEntry: any, compileOptions: any, associatedModuleId: any): any;
    loadTemplateResources(viewRegistryEntry: any, associatedModuleId: any): any;
    importViewModelResource(moduleImport: any, moduleMember: any): any;
    importViewResources(moduleIds: any, names: any, resources: any, associatedModuleId: any): any;
  }
  export class BehaviorInstance {
    constructor(behavior: any, executionContext: any, instruction: any);
    static createForUnitTest(type: any, attributes: any, bindingContext: any): any;
    created(context: any): any;
    bind(context: any): any;
    unbind(): any;
    attached(): any;
    detached(): any;
  }
  export class BindableProperty {
    constructor(nameOrConfig: any);
    registerWith(target: any, behavior: any, descriptor: any): any;
    configureDescriptor(behavior: any, descriptor: any): any;
    defineOn(target: any, behavior: any): any;
    createObserver(executionContext: any): any;
    initialize(executionContext: any, observerLookup: any, attributes: any, behaviorHandlesBind: any, boundProperties: any): any;
    createDynamicProperty(executionContext: any, observerLookup: any, behaviorHandlesBind: any, name: any, attribute: any, boundProperties: any): any;
  }
  class BehaviorPropertyObserver {
    constructor(taskQueue: any, obj: any, propertyName: any, selfSubscriber: any, initialValue: any);
    getValue(): any;
    setValue(newValue: any): any;
    call(): any;
    subscribe(callback: any): any;
  }
  export class HtmlBehaviorResource {
    constructor();
    static convention(name: any, existing: any): any;
    addChildBinding(behavior: any): any;
    analyze(container: any, target: any): any;
    load(container: any, target: any, viewStrategy: any, transientView: any): any;
    register(registry: any, name: any): any;
    compile(compiler: any, resources: any, node: any, instruction: any, parentNode: any): any;
    create(container: any, instruction?: any, element?: any, bindings?: any): any;
    ensurePropertiesDefined(instance: any, lookup: any): any;
  }
  export class ResourceModule {
    constructor(moduleId: any);
    analyze(container: any): any;
    register(registry: any, name: any): any;
    load(container: any): any;
  }
  export class ResourceDescription {
    constructor(key: any, exportedValue: any, resourceTypeMeta: any);
    analyze(container: any): any;
    register(registry: any, name: any): any;
    load(container: any): any;
    static get(resource: any, key?: any): any;
  }
  export class ModuleAnalyzer {
    constructor();
    getAnalysis(moduleId: any): any;
    analyze(moduleId: any, moduleInstance: any, viewModelMember: any): any;
  }
  export class ChildObserver {
    constructor(config: any);
    create(target: any, behavior: any): any;
  }
  
  // TODO: we really only want one child observer per element. Right now you can have many, via @sync.
  // We need to enable a way to share the observer across all uses and direct matches to the correct source.
  export class ChildObserverBinder {
    constructor(selector: any, target: any, property: any, behavior: any, changeHandler: any);
    bind(source: any): any;
    unbind(): any;
    onChange(mutations: any): any;
  }
  export class CompositionEngine {
    static inject(): any;
    constructor(viewEngine: any);
    activate(instruction: any): any;
    createBehaviorAndSwap(instruction: any): any;
    createBehavior(instruction: any): any;
    createViewModel(instruction: any): any;
    compose(instruction: any): any;
  }
  export class ElementConfigResource {
    load(container: any, target: any): any;
    register(): any;
  }
  export function behavior(override: any): any;
  export function customElement(name: any): any;
  export function customAttribute(name: any, defaultBindingMode: any): any;
  export function templateController(target: any): any;
  export function bindable(nameOrConfigOrTarget?: any, key?: any, descriptor?: any): any;
  export function dynamicOptions(target: any): any;
  export function sync(selectorOrConfig: any): any;
  export function useShadowDOM(target: any): any;
  export function skipContentProcessing(target: any): any;
  export function containerless(target: any): any;
  export function viewStrategy(strategy: any): any;
  export function useView(path: any): any;
  export function noView(target: any): any;
  export function elementConfig(target: any): any;
}