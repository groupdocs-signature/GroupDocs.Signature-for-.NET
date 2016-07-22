(function ($, undefined) {
    $.widget('ui.fileOpenDialog', {
        _viewModel: null,
        options: {
            autoOpen: true,
            url: '',
            uploadWebFiles: false,
            fileTypes: "doc,docx,docm,dot,dotx,dotm,rtf,odt,ott,pdf",
            resourcePrefix: ""
        },

        _create: function () {
            var self = this;
            var options = self.options;
            var root = this.element;

            root.addClass(
                'modal ' +
                'fade ' +
                'modal2 ' +
                'modal800px');

            var innerWrapper = (self.wrapper = $('<div></div>'))
				.addClass('modal_inner_wrapper')
				.prependTo(root);

            this._buildDialogHeader(innerWrapper);

            var content = (self.content = $('<div></div>'))
                .addClass('modal_content')
                .appendTo(innerWrapper);

            var inputWrapLeft = (self.inputWrapLeft = $('<div></div>'))
                .addClass('modal_input_wrap_left')
                .appendTo(content);

            var fileExplorer = (self.fileExplorer = $('<div></div>'))
                .addClass('file_browser_content')
                .appendTo(inputWrapLeft);

            this._buildFileUploader(fileExplorer, self);

            var filesArea = (self.filesArea = $('<div></div>'))
                .attr('data-bind', 'fileDnD: {}')
                .css({ position: 'relative' })
                .appendTo(fileExplorer);

            var explorerProgressWrapper = $('<div></div>')
                .css({ position: 'relative' })
                .appendTo(filesArea);

            var explorerHeader = $('<div></div>')
                .addClass('file_browser_sort')
                .appendTo(filesArea);

            this._buildExplorerHeaders(explorerHeader, 'file_browser_sort_filename', 'Name', 'File Name', 'FileName');
            this._buildExplorerHeaders(explorerHeader, 'file_browser_sort_size', 'Size', 'Size', 'Size');
            this._buildExplorerHeaders(explorerHeader, 'file_browser_sort_modified', 'ModifiedOn', 'Modified', 'Modified');

            this._buildFoldersList(filesArea);
            this._buildFilesList(filesArea);

            this._buildFooter(innerWrapper);
            this.element.trigger("onHtmlCreated");

            this._viewModel = this.getViewModel();
        },

        _init: function () {
        },

        _buildDialogHeader: function (parent) {
            var close = $('<div></div>')
                .addClass('popclose')
                .attr('data-dismiss', 'modal')
                .appendTo(parent);

            var header = $('<div></div>')
                .addClass('modal_header')
                .appendTo(parent);

            var headerText = $('<h3></h3>')
                .text('Open File')
                .attr("data-localize", "OpenFile")
                .appendTo(header);
        },

        _buildFileUploader: function (parent, self) {
            var fileUploader = (self.fileUploader = $('<div></div>'))
                .addClass('file_browser_toolbar')
                .css({
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden'
                })
                .appendTo(parent);

            var bindingWithStart = $('<!-- ko with: isNotRootFolder -->')
                .appendTo(fileUploader);

            var openParentFolderButton = $('<a></a>')
                .addClass(
                    'small_button ' +
                    'file_browser_upload_btn')
                .attr("data-localize", "ParentFolder")
                .attr('data-bind', 'click: function () { $parent.openParentFolder();}')
                .text('Parent folder')
                .appendTo(fileUploader);

            var bindingWithEnd = $('<!-- /ko -->')
                .appendTo(fileUploader);

            if (self.options.uploadWebFiles) {
                var openFromUrlButton = (self.openFromUrlButton = $('<a></a>'))
                    .addClass('small_button')
                    .text('Open From URL')
                    .appendTo(fileUploader);
            }
        },
        _buildExplorerProgress: function (parent) {
            var explorerProgress = $('<div></div>')
                .attr('data-bind', 'visible: busy()')
                .addClass('explorer-progress')
                .appendTo(parent);

            var explorerProgressContent = $('<div></div>')
                .css({
                    position: 'relative',
                    top: '50px',
                    left: '50%',
                    width: '96px',
                    height: '56px'
                })
                .appendTo(explorerProgress);

            var explorerProgressImg = $('<img/>')
                .attr('src', this.options.resourcePrefix + '/Images/uploading.gif')
                .attr('alt', '')
                .css({
                    width: '16px',
                    height: '16px'
                })
                .appendTo(explorerProgressContent);

            var br = $('<br/>')
                .appendTo(explorerProgressContent);

            var explorerProgressPercentage = (self.explorerProgressPercentage = $('<span></span>'))
                .attr('id', 'explorer-progress-percentage')
                .appendTo(explorerProgressContent);
        },
        _buildExplorerHeaders: function (parent, /*elementId,*/elementClass, setOrderBy, headerName, localizationKey) {
            var element = $('<a></a>')
                .attr('href', '#')
                .attr('data-bind', 'click: function() { setOrder("' + setOrderBy + '");}')
                .addClass(elementClass)
                .appendTo(parent);

            var text = $('<h4></h4>')
                .text(headerName)
                .attr('data-localize', localizationKey)
                .appendTo(element);

            var smallarrow = $('<span></span>')
                .addClass('smallarrow')
                .attr('data-bind', 'visible: orderBy() === \'' + setOrderBy + '\', css: {up: orderAsc(), down: !orderAsc()}')
                .appendTo(element);
        },
        _buildFoldersList: function (parent) {
            var folderList = $('<ul></ul>')
                .addClass('file_browser_folder_list')
                .attr('data-bind', 'foreach: folders')
                .appendTo(parent);

            var foldersListItem = $('<li></li>')
                .attr('data-bind', 'attr: { id: \'explorer-entity-\' + id }, click: open')
                .appendTo(folderList);

            var folderBrowserWrapper = $('<div></div>')
                .addClass('file_browser_listbox folderlist')
                .appendTo(foldersListItem);

            var folderIcon = $('<span></span>')
                .addClass(
                    'listicons ' +
                    'licon_folder')
                .appendTo(folderBrowserWrapper);

            var folderName = $('<p></p>')
                .addClass(
                    'listname_file_browser ' +
                    'foldername')
                .attr('data-bind', 'text: name()')
                .appendTo(folderBrowserWrapper);
        },
        _buildFilesList: function (parent) {
            var filesList = $('<ul></ul>')
                .addClass('file_browser_file_list')
                .attr('data-bind', 'foreach: files')
                .appendTo(parent);

            var fileListItem = $('<li></li>')
                .attr('data-bind', 'attr: { id: \'explorer-entity-\' + id }, click: open')
                .appendTo(filesList);

            var filesBrowserWrapper = $('<div></div>')
                .addClass('file_browser_listbox filelist')
                .appendTo(fileListItem);

            var fileIcon = $('<span></span>')
                .addClass('listicons')
                .attr('data-bind', 'css: { \'licon_unkwn\': (docType() != \'words\' && docType() != \'pdf\' &&  docType() != \'slides\' &&docType() != \'cells\' && docType() != \'image\' && docType() != \'email\' && docType() != \'diagram\' && docType() != \'project\' && docType() != \'taggedimage\'), \'licon_word\': docType() == \'words\', \'licon_pdf\': docType() == \'pdf\', \'licon_ppt\': docType() == \'slides\', \'licon_xls\': docType() == \'cells\', \'licon_bmp\': (docType() == \'image\' || docType() == \'taggedimage\'), \'licon_outlook\': docType() == \'email\', \'licon_visio\': docType() == \'diagram\', \'licon_mpp\': docType() == \'project\' }')
                .appendTo(filesBrowserWrapper);

            var fileName = $('<p></p>')
                .addClass(
                    'listname_file_browser ' +
                    'filename' +
                    'ellipses')
                .attr('data-bind', 'text: name(), ellipsis: true')
                .appendTo(filesBrowserWrapper);

            var fileSize = $('<p></p>')
                .addClass(
                    'listfilesize ' +
                    'listsmalltext')
                .attr('data-bind', 'text: (sizeInKb() + \'Kb\')')
                .appendTo(filesBrowserWrapper);

            $('<p></p>')
                .addClass(
                    'listfilesize ' +
                    'listsmalltext')
                .attr('data-bind', 'text: modifiedOn()')
                .appendTo(filesBrowserWrapper);
        },
        _buildFooter: function (parent) {
            var footer = (self.footer = $('<div></div>'))
                .addClass('modal_footer')
                .appendTo(parent);

            var btnWrapper = $('<div></div>')
                .addClass('modal_btn_wrapper')
                .appendTo(footer);
        },

        _createViewModel: function () {
            var url = this.options.hostUrl;
            var userId = this.options.userId;
            var userKey = this.options.userKey;
            var fileExplorer = $(this.fileExplorer).explorer({ userId: userId, privateKey: userKey, pageSize: 30, fileTypes: this.options.fileTypes, urlHashEnabled: this.options.urlHashEnabled, instanceIdToken: this.options.instanceIdToken });
            var fileUploader = $(this.fileUploader).uploader({ url: url, userId: userId, key: userKey, proxy: 'Uploader.aspx', fld: '', multiple: true, addFileBtn: $(this.uploadButton) });

            return new fileOpenDialogViewModel(this, fileUploader, fileExplorer);
        },

        getViewModel: function () {
            if (!this._viewModel) {
                this._viewModel = this._createViewModel();
            }

            return this._viewModel;
        },

        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

})(jQuery);