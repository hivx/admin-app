import { css, Global, useTheme } from '@emotion/react';
import { Box, styled, SxProps, lighten } from '@mui/material';
import { Editor, IAllProps } from '@tinymce/tinymce-react';
import { IProps } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
import { forwardRef, MutableRefObject, useCallback, useState } from 'react';
import tinymce, { Ui } from 'tinymce';
// DOM model
import 'tinymce/models/dom/model';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/wordcount';

// importing plugin resources
import 'tinymce/plugins/emoticons/js/emojis';
import { filterTransientProps } from '@/utils/filterTransientProps';

// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
// import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
// import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';

const toolbarLocation: IProps['init']['toolbar_location'] = 'top';

type CustomAddButton = {
  name: string;
  options: Ui.Toolbar.ToolbarButtonSpec;
};

export type IHtmlEditorProps = IAllProps & {
  editorRef?: MutableRefObject<Editor['editor']>;
  printable?: boolean;
  readonly?: boolean;
  placeholder?: string;
  editorOnclickEvent?: () => void;
  onEditorRemove?: () => void;
  contentStyle?: string;
  customToolbar?: IProps['init']['toolbar'];
  disableContextMenu?: string | false;
  keybinds?: string[];
  onEditorInit?: (editor: Editor['editor']) => void;
  setup?: (editor: Editor['editor']) => void;
  onFocusEditor?: (editor: Editor['editor']) => void;
  onBlurEditor?: (editor: Editor['editor']) => void;
  customAddButtons?: CustomAddButton[];
  height?: string;
  width?: string;
  sx?: SxProps;
};

/**
 * Default init editor
 */
export const defaultEditorConfig = {
  init: {
    content_css: false,
    menubar: false,
    height: '300px',
    resize: false,
    plugins: ['table', 'code', 'preview', 'lists'],
    // paste_as_text: true,
    branding: false,
    skin: false,
    // fontsize_formats: '12pt 14pt 18pt 20pt 24pt 30pt',
    // font_css: { style },
    inline_boundaries: false,
    // content_style:
    //   '@media print {@page { margin:15px 35px;}} body{ font-size: 12pt; } p {margin-bottom: .2rem; margin-top: .2rem}; th, td {padding: .2rem;} body { font-family: Arial, Helvetica, sans-serif };',
    // force_p_newlines: false,
    forced_root_block: 'div',
    // content_css: '/mycontent.css',
    table_toolbar: '', // tat pop up toolbar khi con tro chuot o table
    // contextmenu_never_use_native: true,
    statusbar: false,
    toolbar_location: toolbarLocation,
    file_picker_callback: () => {}, // TODO: compose this with image attachment module
    toolbar: `bold italic backcolor forecolor  | 
    alignleft aligncenter alignright alignjustify  |
    table tabledelete | tableprops tablerowprops tablecellprops | 
    tableinsertrowbefore tableinsertrowafter tabledeleterow | 
    tableinsertcolbefore tableinsertcolafter tabledeletecol |
    code preview |`,
    paste_auto_cleanup_on_paste: true,
    entity_encoding: 'raw',
  },
} satisfies Partial<IAllProps>;

/**
 * Get config from props
 * @returns Object
 */
export const getEditorConfig = ({
  printable = false,
  readonly,
  placeholder,
  editorOnclickEvent,
  onEditorRemove,
  height,
  contentStyle,
  customToolbar,
  disableContextMenu,
  customAddButtons,
  keybinds,
}: IHtmlEditorProps): IAllProps => {
  const plugins = [...defaultEditorConfig.init.plugins];
  const contextmenu = plugins.join(' ');
  if (printable) {
    plugins.push('print');
  }

  /**
   * Toolbar hiển thị trên editor:
   * 1.Nếu có customToolbar thì hiển thị theo customToolbar
   * 2.Nếu có customAddButtons thì sẽ hiển thị theo default toolbar và customAddButtons
   */
  let execToolbar: IProps['init']['toolbar'];

  if (customToolbar) {
    execToolbar = customToolbar;
  } else {
    execToolbar = `${defaultEditorConfig.init.toolbar}`;
    customAddButtons?.forEach((button) => (execToolbar += `${button.name} `));
  }

  const setup = (editor: Editor['editor']) => {
    if (customAddButtons) {
      customAddButtons.map((customButton) => {
        editor?.ui.registry.addButton(customButton.name, customButton.options);
      });
    }
  };

  const customContextMenu: IProps['init']['contextmenu'] = disableContextMenu
    ? false
    : contextmenu;

  return {
    ...defaultEditorConfig,
    init: {
      ...defaultEditorConfig.init,
      plugins,
      placeholder,
      contextmenu: customContextMenu,
      contextmenu_never_use_native: !disableContextMenu,
      init_instance_callback: (editor: Editor['editor']) => {
        editorOnclickEvent && editor?.on('click', editorOnclickEvent);
        onEditorRemove && editor?.on('remove', onEditorRemove);
      },
      content_style: contentStyle,
      height: height,
      setup,
      toolbar: execToolbar ?? defaultEditorConfig.init.toolbar,
      readonly,
    },
    disabled: readonly,
  };
};

declare global {
  interface Window {
    tinymce: typeof tinymce;
  }
}
window.tinymce = tinymce;

export const HtmlEditor = forwardRef<HTMLElement, IHtmlEditorProps>((props, ref) => {
  const {
    placeholder,
    readonly,
    printable,
    editorRef,
    editorOnclickEvent,
    onEditorInit,
    onEditorRemove,
    disableContextMenu,
    contentStyle,
    customToolbar,
    keybinds,
    height,
    width,
    sx,
    customAddButtons,
  } = props;

  const theme = useTheme();
  // change content_style text color based on current BACKGROUND COLOR of editor
  const finalContentStyle =
    contentStyle ||
    `body { color: ${theme.palette.getContrastText(theme.palette.background.default)}; }`;

  const editorConfig = () => ({
    ...getEditorConfig({
      printable,
      readonly,
      placeholder,
      editorOnclickEvent,
      onEditorRemove,
      contentStyle: finalContentStyle,
      customToolbar,
      keybinds,
      disableContextMenu,
      height,
      customAddButtons,
    }),
  });

  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const config = editorConfig();

  const onInit = useCallback<NonNullable<IAllProps['onInit']>>(
    (e, editor) => {
      if (editorRef) {
        editorRef.current = editor;
      }
      if (onEditorInit) onEditorInit(editor);
    },
    [editorRef, onEditorInit],
  );

  const onFocus: IAllProps['onFocus'] = (event, editor) => {
    if (props.inline && props.toolbar !== false) {
      setIsVisibleToolbar(true);
    }
    props.onFocus && props.onFocus(event, editor);
  };

  const onBlur: IAllProps['onBlur'] = (event, editor) => {
    if (props.inline && props.toolbar !== false) {
      setIsVisibleToolbar(false);
    }
    props.onBlur && props.onBlur(event, editor);
  };

  // useEffect(() => {
  //   if (keybinds && editor) {
  //     keybinds.forEach((keybind) => {
  //       if (keybind.disabled) {
  //         editor.addShortcut(keybind.hotkey.toLowerCase(), '', '');
  //       } else
  //         editor.addShortcut(keybind.hotkey.toLowerCase(), keybind.description, () =>
  //           keybind.function(),
  //         );
  //     });
  //   }
  // }, [keybinds]);
  return (
    <StyledEditorContainer
      height={height}
      width={width}
      sx={sx}
      $isVisibleToolbar={isVisibleToolbar}
      ref={ref}
    >
      <Global styles={ToolbarStyles} />
      <Editor
        {...config}
        {...props}
        key={theme.palette.mode}
        onInit={onInit}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </StyledEditorContainer>
  );
});

HtmlEditor.displayName = 'HtmlEditor';

const TOOLBAR_HEIGHT = '40px';
const PADDING_X = '8.5px';
const PADDING_BOTTOM = '14px';

const ToolbarStyles = css`
  div[class*='tox-tinymce--toolbar'] {
    // must be higher than MUI Modal
    z-index: 1300;
    height: ${TOOLBAR_HEIGHT};
    transform: translateY(120%) translateX(${PADDING_X});
  }
`;

const DefaultStyledEditor = css`
  .tox-tinymce {
    border: 0;
  }
  .mce-edit-focus {
    outline: none;
  }
`;

const StyledEditorContainer = styled(Box, filterTransientProps)<{
  $isVisibleToolbar?: boolean;
}>`
  ${DefaultStyledEditor}
  ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.text.primary};
  background-color: ${(props) => props.theme.pacs?.customColors.backgroundEditor};

  font-family: ${(props) => props.theme.typography.fontFamily};
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  .mce-content-body {
    padding: ${(props) =>
        props.$isVisibleToolbar && `calc(${TOOLBAR_HEIGHT} + ${PADDING_BOTTOM})`}
      ${(props) => props.$isVisibleToolbar && PADDING_X} ${PADDING_BOTTOM} ${PADDING_X};
    max-height: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
    word-break: break-word;
    overflow: auto;
    border: 0;
    color: ${(props) => props.theme.palette.text.primary};
  }
  .tox {
    .tox-edit-area__iframe {
      background-color: ${(props) => props.theme.palette.background.default};
    }
    .tox-editor-container .tox-editor-header {
      background-color: ${(props) => props.theme.palette.background.default};
      border-bottom: 1px solid ${(props) => props.theme.pacs?.customColors.borderColor};
      padding: 0;
      .tox-toolbar__primary {
        background-color: ${(props) => props.theme.palette.background.default};
        border: 0;
      }
    }
    .tox-tbtn svg {
      fill: ${(props) => props.theme.palette.text.primary} !important;
    }
    .tox-tbtn {
      &:hover {
        background-color: ${(props) => lighten(props.theme.palette.secondary.main, 0.4)};
      }
    }
    .tox-toolbar-overlord {
      background-color: ${(props) => props.theme.palette.background.default};
    }
  }
`;
