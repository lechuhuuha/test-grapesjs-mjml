// Specs: https://documentation.mjml.io/#mj-navbar-link
import type grapesjs from 'grapesjs';
import { componentsToQuery, getName, isComponentType } from './utils';
import { type as typeNavBar } from './NavBar';

export const type = 'mj-navbar-link';

export default (editor: grapesjs.Editor, { coreMjmlModel, coreMjmlView }: any) => {
  editor.Components.addType(type, {
    isComponent: isComponentType(type),
    extend: 'link',
    model: {
      ...coreMjmlModel,
      defaults: {
        name: getName(editor, 'navLink'),
        draggable: componentsToQuery(typeNavBar),
        highlightable: false,
        stylable: [
          'font-style', 'font-size', 'font-weight', 'font-family', 'color',
          'text-decoration', 'text-transform',
          'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
          'letter-spacing', 'line-height'
        ],
        'style-default': {
          'font-size': '13px',
          'padding': '25px 10px',
          // 'padding-top': '25px',
          // 'padding-bottom': '25px',
          // 'padding-left': '10px',
          // 'padding-right': '10px',
          'text-transform': 'uppercase',
        },
        traits: ['href'],
      },
    },


    view: {
      ...coreMjmlView,
      tagName: 'span',

      attributes: {
        style: 'pointer-events: all; float: none; display: inline-table;',
        "data-gjs-type": type
      },

      getMjmlTemplate() {
        let parentView = this.model.parent()?.view;
        // @ts-ignore
        if (parentView?.getInnerMjmlTemplate) {
          let mjmlNavBar = coreMjmlView.getInnerMjmlTemplate.call(parentView);
          return {
            start: `<mjml><mj-body><mj-column>${mjmlNavBar.start}`,
            end: `${mjmlNavBar.end}</mj-column></mj-body></mjml>`,
          };
        } else {
          return {
            start: `<mjml><mj-body><mj-column><mj-navbar>`,
            end: `</mj-navbar></mj-column></mj-body></mjml>`,
          };
        }
      },

      getTemplateFromEl(sandboxEl: any) {
        return sandboxEl.querySelector('div').innerHTML;
      },

      getChildrenSelector() {
        return 'a,p';
      },

      /**
      * Prevent content repeating
      */
      renderChildren() {
        //console.log("a")
        //debugger
        coreMjmlView.renderChildren.call(this);
      },

      /**
      * Need to make text selectable.
      */
      onActive() {
        this.getChildrenContainer().style.pointerEvents = 'all';
      },

      disableEditing() {
        this.getChildrenContainer().style.pointerEvents = 'none';
      },

      // rerender() {
      //   this.render();
      // },
    },
  });
};
