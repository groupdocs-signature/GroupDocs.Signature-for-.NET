$(function() {
    $.widget("ui.groupdocsSignaturePrepare", {
        options: {
            previewDocument: '',
            hostUrl: '',
            showHeader: true,
            documentGuid: '',
            recipientGuid: '',
            dateFormats: []
        },
        prepareDoc: null,

        on: function(eventName, handler) {
            $(this.element).on(eventName, handler);
        },

        off: function(eventName, handler) {
            $(this.element).off(eventName, handler);
        },

        _addHtml: function () {
            $(this.element).empty();
            $(this.element).html(
        "\
            <!-- Main content -->\
            <div >\
                <!-- ko template: 'widgets/document-thumbnails' --><!-- /ko -->\
                \
            </div>\
            <!-- ko template: 'widgets/document-prepare' --><!-- /ko -->\
            <div id='viewer-navigation'></div>\
            <div id='viewer-zoom'></div>\
            \
            <!-- ko stopBindings: true -->\
            <div id='errorDialog' class='modal fade modal2 modal800px' data-bind='modal: isVisible,  modalOptions: { beforeShow: onBeforeShow, beforeClose: onBeforeClose }' data-keyboard='false' data-backdrop='false'>\
                <div class='modal_inner_wrapper'>\
	                <div class='modal_header'>\
                        <h3>Error</h3>\
                    </div>\
                    <div class='modal_content'>\
		                <div class='modal_input_wrap_left'>\
                            <div data-bind=\"text: errorText\"></div>\
                        </div>\
                    </div>\
                    <div class='modal_footer'>\
                        <div class='modal_btn_wrapper'>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <!-- /ko -->\
            <!-- ko stopBindings: true -->\
            \
            <!-- /ko -->\
            <div id='jerror' title='Error' class='modal fade modal2'>\
                <div class='modal_inner_wrapper'>\
                    <a class='popclose' data-dismiss='modal'></a>\
                    <div class='modal_header'>\
                        <h3>Error</h3>\
                    </div>\
                    <div class='modal_content'>\
                        <div class='modal_input_wrap_left'>\
                            <div id='jerrorMsg'></div>\
                        </div>\
                    </div>\
                    <div class='modal_footer'>\
                        <div class='modal_btn_wrapper'>\
                            <a href='#' data-dismiss='modal' class='grey_button right'>Close</a>\
                        </div>\
                    </div>\
                </div>\
            </div>");

        },

        // the constructor
        _create: function () {
            var self = this;
            require(['prepareDocument'], function (prepareDocument) {
                self._addHtml();
                self.prepareDoc = new prepareDocument();
                self.prepareDoc.init($(self.element), self.options);
                var viewerMainWrapper = $(self.element).parent();
                viewerMainWrapper.attr("id", "mainwrapper");
                viewerMainWrapper.addClass("mainwrap_sidescroll");
                viewerMainWrapper.css("padding", "35px 0 15px");
            });
            self.on("onDocumentLoadComplete", function(event, data) {

                if (!data.lic) {
                    var viewerMainWrapper = $(self.element).parent();
                    viewerMainWrapper.find(".banner_trial").remove();
                    viewerMainWrapper.find(".banner_trial").remove();
                    var licElement = $("<div/>");
                    $(licElement).addClass("banner_trial");
                    $(licElement).css("top",0);
                    $(licElement).css("z-index",100000);
                    $(licElement).html("This viewer has been created using an unlicensed version of " +
                        "<a href='http://groupdocs.com' target='_blank'>GroupDocs.Signature</a> for .NET ");
                    $(licElement).insertAfter(viewerMainWrapper);
                };
            });
        }
        
       
    });
});
define('core/model',
    [
        'core/model/model.envelope',
        'core/model/model.envelope.recipient',
        'core/model/model.contact',
        'core/model/model.template',
        'core/model/model.template.recipient',
        'core/model/model.signature',
        'core/model/model.form'
    ],
    function (envelope,
        envelopeRecipient,
        contact,
        template,
        templateRecipient,
        signature,
        form
    ) {
        var
            model = {
                envelope: envelope,
                envelopeRecipient: envelopeRecipient,
                contact: contact,
                template: template,
                templateRecipient: templateRecipient,
                signature: signature,
                form: form
            };
        return model;
    });
define('core/model/model.auditlog',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            log = function () {
                var self = this;
                self.id = ko.observable('');
                self.type = ko.observable(0);
                self.date = ko.observable('');                
                self.userName = ko.observable('');
                self.action = ko.observable('');
                self.remoteAddress = ko.observable('');
                self.details = ko.observable('');
            };

        log.fromDto = function (dto) {
            var item = new log().id(dto.id);

            item.date(dto.date)
                .type(dto.type)
                .userName(dto.userName)
                .action(dto.action)
                .remoteAddress(dto.remoteAddress)
                .details(dto.details);
            return item;
        };
        log.blank = function () {
            var item = new log();
            return item;
        };
        log.getDtoId = function (dto) { return dto.id; };

        return log;
    });
define('core/model/model.contact',
    ['ko',
     'lib/underscore'],
    function (ko, _) {
        var
            contact = function () {
                var self = this;
                self.id = ko.observable();
                self.firstName = ko.observable();
                self.lastName = ko.observable();
                self.email = ko.observable();
                self.provider = ko.observable();
                self.fullName = ko.computed(function () {
                    return self.firstName() + " " + self.lastName();
                }, this);
                self.selected = ko.observable(false);
            };

        contact.fromDto = function(dto) {
            var item = new contact().id(dto.id);

            item.firstName(dto.firstName)
                .lastName(dto.lastName)
                .email(dto.email)
                .provider(dto.provider);
            ko.validation.group(item);
            return item;
        };
        contact.getDtoId = function (dto) { return dto.id; };
        return contact;
    });
define('core/model/model.document.field',
    ['ko',
    'core/config',
    'core/utils',
    'core/model/model.document.fieldlocation'
    ],
    function (ko, config, utils, documentFieldLocation) {
        var
            documentField = function () {
                var self = this;
                self.id = ko.observable('');
                self.documentId = ko.observable('');
                self.recipientId = ko.observable('');
                self.name = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } });
                self.mandatory = ko.observable(false);
                self.order = ko.observable('');
                self.regularExpression = ko.escapedObservable('');
                self.getDataFrom = ko.observable('');
                self.data = ko.observable(null);
                self.fillTimeStamp = ko.observable('');
                self.signatureFieldId = ko.observable('');
                self.locations = ko.observableArray([]);
                self.fieldType = ko.observable('');
                self.fieldType.subscribeChanged(function (newValue, oldValue) {
                    if (oldValue != null && oldValue!=newValue) {
                        self.prepareSettings(newValue);
                    }
                });
                self.acceptableValuesArray = ko.observableArray([]);
                self.defaultValue = ko.escapedObservable(null);
                self.tooltip = ko.escapedObservable('');
                self.guidanceText = ko.escapedObservable('');
                self.groupName = ko.escapedObservable('');
                self.settings = ko.observable();
                self.lockDuringSign = ko.observable(true);
                self.progress = ko.observable(0);
                self.templateName = ko.computed(function() {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "signature-field-template";
                        case config.signatureFieldType.SingleLine:
                            return "singleline-field-template";
                        case config.signatureFieldType.MultiLine:
                            return "multiline-field-template";
                        case config.signatureFieldType.Date:
                            return "date-field-template";
                        case config.signatureFieldType.Dropdown:
                            return "dropdown-field-template";
                        case config.signatureFieldType.Checkbox:
                            return "checkbox-field-template";
                        case config.signatureFieldType.File:
                            return "file-field-template";
                        case config.signatureFieldType.Stamp:
                            return "stamp-field-template";
                    }
                    return "";
                });
                self.fieldTypeText = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "Signature";
                        case config.signatureFieldType.SingleLine:
                            return "Single line text field";
                        case config.signatureFieldType.MultiLine:
                            return "Multi line text field";
                        case config.signatureFieldType.Date:
                            return "Date";
                        case config.signatureFieldType.Dropdown:
                            return "Dropdown";
                        case config.signatureFieldType.Checkbox:
                            return "Checkbox";
                        case config.signatureFieldType.File:
                            return "File";
                        case config.signatureFieldType.Stamp:
                            return "Stamp";
                    }
                    return "";
                });
                self.acceptableValues = ko.computed(function () {
                    return self.acceptableValuesArray().join(";");
                });
                self.isCalcField = ko.computed(function () {
                    return self.settings() != null && self.settings().calculationScript != null;
                });
                //self.dirtyFlag = new ko.DirtyFlag([self.name, self.regularExpression, self.acceptableValuesArray, self.defaultValue, self.tooltip]);
                self.dirtyFlag = new ko.DirtyFlag([self.name, self.defaultValue, self.tooltip, self.acceptableValues, self.guidanceText, self.recipientId, self.groupName, self.mandatory, self.regularExpression, self.settings, self.lockDuringSign]);
                
                self.prepareSettings = function (filedType, settingsJson) {
                    if (settingsJson == undefined)
                        settingsJson = {};
                    switch (filedType) {
                        case config.signatureFieldType.Date:
                            var dateSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                showMonthYearDropdowns: ko.observable(dateSettings != null && dateSettings.showMonthYearDropdowns != null ? dateSettings.showMonthYearDropdowns : true),
                                minYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.minYear : new Date().getFullYear() - 99).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                maxYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.maxYear : new Date().getFullYear() + 30).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                dateFormat: ko.observable(dateSettings != null && dateSettings.dateFormat != null ? dateSettings.dateFormat : "dd.mm.yy")
                            });
                            ko.validation.group(self.settings);
                            break;
                        case config.signatureFieldType.Signature:
                            var signatureSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                matchWidth: ko.observable(signatureSettings != null && signatureSettings.matchWidth != null ? signatureSettings.matchWidth : false),
                                matchHeight: ko.observable(signatureSettings != null && signatureSettings.matchHeight != null ? signatureSettings.matchHeight : true)
                            });

                            break;
                        case config.signatureFieldType.Checkbox:
                            var checkboxSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                checkboxBorder: ko.observable(checkboxSettings != null && checkboxSettings.checkboxBorder != null ? checkboxSettings.checkboxBorder : true),
                            });
                            break;
                        case config.signatureFieldType.SingleLine:
                            var textSettings = ko.utils.parseJson(settingsJson);
                            var minValue = textSettings != null && textSettings.minValue != null ? textSettings.minValue : null;
                            var maxValue = textSettings != null && textSettings.maxValue != null ? textSettings.maxValue : null;
                            var validationScript = textSettings != null && textSettings.validationScript != null ? textSettings.validationScript : null;
                            var calculationScript = textSettings != null && textSettings.calculationScript != null ? textSettings.calculationScript : null;
                            self.settings({
                                maxLength: ko.observable(textSettings != null && textSettings.maxLength != null ? textSettings.maxLength : "").extend({ number: true, min: 1 }),
                                minValue: ko.observable(minValue).extend({ number: true }),
                                maxValue: ko.observable(maxValue).extend({ number: true }),
                                validationScript: validationScript,
                                calculationScript: calculationScript
                            });
                            if (minValue != null || maxValue != null) {
                                self.data.extend({ number: true });
                                if (minValue != null)
                                    self.data.extend({ min: minValue });
                                if (maxValue != null)
                                    self.data.extend({ max: maxValue });
                            }
                            if (validationScript != null) {
                                self.data.extend({
                                        validation: {
                                            validator: function (val) {
                                                var event = {};
                                                event.value = val;
                                                return eval(validationScript);
                                            },
                                            message: 'Invalid value'
                                        }
                                    });
                            }
                            break;
                        default:

                    }
                };
            };

        documentField.fromDto = function (dto) {
            var item = new documentField().id(dto.id);
            item.name(dto.name)
                .documentId(dto.documentId)
                .recipientId(dto.recipientId)
                .order(dto.order)
                .regularExpression(dto.regularExpression)
                .getDataFrom(dto.getDataFrom)
                .data(utils.decodeUtf8(dto.data==null?[]:dto.data))
                .fillTimeStamp(dto.fillTimeStamp)
                .fieldType(dto.fieldType)
                .acceptableValuesArray(dto.acceptableValues!=null ? dto.acceptableValues.split(';') : [])
                .defaultValue(dto.defaultValue)
                .tooltip(dto.tooltip)
                .guidanceText(dto.guidanceText)
                .groupName(dto.groupName)
            ;
            if (dto.mandatory != null) item.mandatory(dto.mandatory);
            if (dto.lockDuringSign != null) item.lockDuringSign(dto.lockDuringSign);

            var locations = _.map(dto.locations, function (dtoLocation) {
                var location = documentFieldLocation.fromDto(dtoLocation);
                utils.ensureValidFieldWidthAndHeight(location, dto.fieldType);
                return location;
            });

            if (dto.fieldType == config.signatureFieldType.SingleLine || item.fieldType() == config.signatureFieldType.MultiLine || item.fieldType() == config.signatureFieldType.Date) {
                //item.data.extend({ defaultIfNull: item.defaultValue() });
                item.data(item.defaultValue());
            }

            ko.validation.group(item);
            item.locations(locations);
            item.prepareSettings(dto.fieldType, dto.settings);
            item.dirtyFlag().reset();
            return item;
        };
        documentField.blank = function () {
            var item = new documentField()
                .fieldType(config.signatureFieldType.Signature)
                .data('')
                .name("Signature")
                .id('')
                .settings({ matchHeight: ko.observable(true) })
                .defaultValue('')
                .mandatory(true);
            item.locations.push(new documentFieldLocation()
                .page(1)
                .locationY(0.300)
                .locationX(0.400)
                .locationWidth(200)
                .locationHeight(66)
                .selected(true)
            );
            var validators = {};
            validators.required = { message: (item.tooltip() != '' ? item.tooltip() : item.name()) + " - " + config.validationMessages.requiredNoStar };
            item.data.extend(validators);
            ko.validation.group(item);
            return item;
        };
        documentField.getDtoId = function (dto) { return dto.id; };
        return documentField;
    });
define('core/model/model.document.fieldlocation',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            documentFieldLocation = function () {
                var self = this;
                self.id = ko.observable('');
                self.documentId = ko.observable('');
                self.fieldId = ko.observable('');
                self.page = ko.observable('');
                self.locationX = ko.observable('');
                self.locationY = ko.observable('');
                self.locationWidth = ko.observable('');
                self.locationHeight = ko.observable('');
                self.fontName = ko.observable('');
                self.fontColor = ko.observable('');
                self.fontSize = ko.observable('');
                self.fontBold = ko.observable(false);
                self.fontItalic = ko.observable(false);
                self.fontUnderline = ko.observable(false);
                self.align = ko.observable(0);
                self.order = ko.observable(0);
                self.selected = ko.observable(false);
                self.dirtyFlag = new ko.DirtyFlag([self.fontName, self.fontColor, self.fontSize, self.fontBold, self.fontItalic, self.fontUnderline, self.align]);
            };

        documentFieldLocation.fromDto = function (dto) {
            var item = new documentFieldLocation().id(dto.id);
            item.documentId(dto.documentId)
                .fieldId(dto.fieldId)
                .page(dto.page)
                .locationX(dto.locationX)
                .locationY(dto.locationY)
                .locationWidth(dto.locationWidth)
                .locationHeight(dto.locationHeight)
                .fontName(dto.fontName)
                .fontColor(dto.fontColor)
                .fontSize(dto.fontSize)
                .fontBold(dto.fontBold)
                .fontItalic(dto.fontItalic)
                .fontUnderline(dto.fontUnderline)
                .align(dto.align)
                .order(dto.order);
            item.dirtyFlag().reset();
            return item;
        };
        documentFieldLocation.blank = function () {
            var item = new documentFieldLocation();
            return item;
        };
        documentFieldLocation.getDtoId = function (dto) { return dto.id; };
        return documentFieldLocation;
    });
define('core/model/model.document.recipient',
    ['ko',
    'core/config',
    'core/utils'
    ],
    function (ko, config,utils) {
        var
            documentRecipient = function () {
                var self = this;
                self.id = ko.observable();
                self.firstName = ko.observable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'First name too long' } });
                self.lastName = ko.observable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'Last name too long' } });
                self.fullName = ko.computed(function () {
                    return self.firstName() + ' ' + self.lastName();
                }, self);
                self.email = ko.observable().extend({ required: { message: config.validationMessages.required }, email: { message: config.validationMessages.invalidEmail }, noSpaces: {} });
                self.userGuid = ko.observable();
                self.order = ko.observable();
                self.roleId = ko.observable();                
                self.status = ko.observable();
                self.statusMessage = ko.observable();                
                self.statusDateTime = ko.observable();
                self.delegatedRecipientId = ko.observable();
                self.signatureFingerprint = ko.observable();
                self.signatureHost = ko.observable();
                self.signatureLocation = ko.observable();
                self.signatureBrowser = ko.observable();
                self.comment = ko.observable();
                self.role = ko.computed(function () {
                    if (self.roleId() == 1)
                        return "Owner";
                    else if (self.roleId() == 2)
                        return "Signer";
                    else
                        return "CC";
                }, self);
                self.statusText = ko.computed(function () {
                    try {
                        var status = '';
                        var statusDate = '';
                        var statusComment = '';
                        if (self.status() != 0) {
                            $.each(config.documentRecipientStatus, function(i, elem) {
                                if (elem.id == self.status())
                                    status = "<p>" + elem.name;
                            });

                            statusDate = ": " + utils.dateFromIso(self.statusDateTime()) + "</p>";
                            if (self.comment() != '') statusComment = "<p>Comment: " + self.comment() + "</p>";
                        }
                        return "<p>" + self.role() + "</p>" + status  + statusDate + statusComment;
                    } catch (ex) {
                        return "";
                    }
                }, self);
                self.statusCss = ko.computed(function() {
                    switch (self.status()) {
                        case -2:
                            return "sig_state_icon expired";
                        case 0:
                            return "sig_state_icon draft";
                        case 1:
                            return "sig_state_icon inprogress";
                        case 2:
                            return "sig_state_icon inprogress";
                        case 3:
                            return "sig_state_icon canceled";
                        case 4:
                            return "sig_state_icon completed";
                    }
                    return "";

                });
                self.dirtyFlag = ko.DirtyFlag([]);
            };

        documentRecipient.fromDto = function (dto) {
            var item = new documentRecipient().id(dto.id);

            item.firstName(dto.firstName)
                .lastName(dto.lastName)
                .email(dto.email)
                .userGuid(dto.userGuid)
                .order(dto.order)
                .roleId(dto.roleId)
                .status(dto.status)
                .statusMessage(dto.statusMessage)
                .statusDateTime(dto.statusDateTime)
                .delegatedRecipientId(dto.delegatedRecipientId)
                .signatureFingerprint(dto.signatureFingerprint)
                .signatureHost(dto.signatureHost)
                .signatureLocation(dto.signatureLocation)
                .signatureBrowser(dto.signatureBrowser)
                .comment(dto.comment);
            ko.validation.group(item);
            return item;
        };
        documentRecipient.blank = function () {
            var item = new documentRecipient();
            ko.validation.group(item);
            return item;
        };
        documentRecipient.getDtoId = function (dto) { return dto.id; };
        
        return documentRecipient;
});
define('core/model/model.envelope.document',
    ['ko', 'core/config'],
    function (ko, config) {
        var
            envelopeDocument = function () {
                var self = this;
                self.documentId = ko.observable();
                self.envelopeId = ko.observable();
                self.order = ko.observable();
                self.name = ko.observable();
                self.originalDocumentMD5 = ko.observable();
                self.finalDocumentMD5 = ko.observable();
                self.originalDocumentPagesCount = ko.observable();
                self.fieldsCount = ko.observable();
                self.originalDocumentImportedFields = ko.observableArray();
                self.totalPages = ko.computed(function () {
                    return "(Total pages: " + self.originalDocumentPagesCount() + ")";
                }, self);
                self.originalDocumentId = ko.observable();
                self.fields = ko.observableArray();
                self.shortName = ko.computed(function () {
                    if (self.name() && self.name().length > 25)
                        return self.name().substring(0, 22) + "...";
                    else
                        return self.name();
                });
                self.viewedOnSign = ko.computed({
                    read: function () {
                        if (!config.checkHtml5StorageSupport() || self.documentId()==null) return true;
                        try {
                            self.name(); // to force re-evaluate when call name.notifySubscribers()
                            return localStorage.getItem("envelope.document." + self.documentId()) != null;
                        } catch (e) {
                            return true;
                        };
                    },
                    write: function (value) {
                        if (config.checkHtml5StorageSupport()) {
                            try {
                                localStorage.setItem("envelope.document." + self.documentId(), value);
                            } catch (e) {
                                localStorage.clear();
                            }
                        }
                    },
                    owner: this
                });
            };

        envelopeDocument.fromDto = function (dto) {
            var item = new envelopeDocument().documentId(dto.documentId);
            item.envelopeId(dto.envelopeId)
                .order(dto.order)
                .name(dto.name)
                .originalDocumentMD5(dto.originalDocumentMD5)
                .finalDocumentMD5(dto.finalDocumentMD5)
                .originalDocumentPagesCount(dto.originalDocumentPagesCount)
                .fieldsCount(dto.fieldsCount)
                .originalDocumentId(dto.originalDocumentId);
            return item;
        };

        envelopeDocument.getDtoId = function (dto) { return dto.documentId; };

        return envelopeDocument;
    });
define('core/model/model.envelope.field',
    ['ko',
    'core/config',
    'core/utils',
    'core/model/model.envelope.fieldlocation'
    ],
    function (ko, config, utils, envelopeFieldLocation) {
        var
            envelopeField = function () {
                var self = this;
                self.id = ko.observable('');
                self.envelopeId = ko.observable('');
                self.recipientId = ko.observable('');
                self.name = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } });
                self.mandatory = ko.observable(false);
                self.order = ko.observable('');
                self.regularExpression = ko.escapedObservable('');
                self.getDataFrom = ko.observable('');
                self.data = ko.observable(null);
                self.fillTimeStamp = ko.observable('');
                self.signatureFieldId = ko.observable('');
                self.locations = ko.observableArray([]);
                self.fieldType = ko.observable('');
                self.acceptableValuesArray = ko.observableArray([]);
                self.defaultValue = ko.escapedObservable(null);
                self.tooltip = ko.escapedObservable('');
                self.guidanceText = ko.escapedObservable('');
                self.groupName = ko.escapedObservable('');
                self.settings = ko.observable();
                self.lockDuringSign = ko.observable(true);
                self.progress = ko.observable(0);
                self.templateName = ko.computed(function() {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "signature-field-template";
                        case config.signatureFieldType.SingleLine:
                            return "singleline-field-template";
                        case config.signatureFieldType.MultiLine:
                            return "multiline-field-template";
                        case config.signatureFieldType.Date:
                            return "date-field-template";
                        case config.signatureFieldType.Dropdown:
                            return "dropdown-field-template";
                        case config.signatureFieldType.Checkbox:
                            return "checkbox-field-template";
                        case config.signatureFieldType.File:
                            return "file-field-template";
                        case config.signatureFieldType.Stamp:
                            return "stamp-field-template";
                    }
                    return "";
                });
                self.fieldTypeText = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "Signature";
                        case config.signatureFieldType.SingleLine:
                            return "Single line text field";
                        case config.signatureFieldType.MultiLine:
                            return "Multi line text field";
                        case config.signatureFieldType.Date:
                            return "Date";
                        case config.signatureFieldType.Dropdown:
                            return "Dropdown";
                        case config.signatureFieldType.Checkbox:
                            return "Checkbox";
                        case config.signatureFieldType.File:
                            return "File";
                        case config.signatureFieldType.Stamp:
                            return "Stamp";
                    }
                    return "";
                });
                self.acceptableValues = ko.computed(function () {
                    return self.acceptableValuesArray().join(";");
                });
                //self.dirtyFlag = new ko.DirtyFlag([self.name, self.regularExpression, self.acceptableValuesArray, self.defaultValue, self.tooltip]);
                self.dirtyFlag = new ko.DirtyFlag([self.name, self.defaultValue, self.tooltip, self.acceptableValues, self.guidanceText, self.recipientId, self.groupName, self.mandatory, self.regularExpression, self.settings, self.lockDuringSign]);
                
                self.prepareSettings = function (filedType, settingsJson) {
                    if (settingsJson == undefined)
                        settingsJson = {};
                    switch (filedType) {
                        case config.signatureFieldType.Date:
                            var dateSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                showMonthYearDropdowns: ko.observable(dateSettings != null && dateSettings.showMonthYearDropdowns != null ? dateSettings.showMonthYearDropdowns : true),
                                minYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.minYear : new Date().getFullYear() - 99).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                maxYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.maxYear : new Date().getFullYear() + 30).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                dateFormat: ko.observable(dateSettings != null && dateSettings.dateFormat != null ? dateSettings.dateFormat : "dd.mm.yy")
                            });
                            ko.validation.group(self.settings);
                            break;
                        case config.signatureFieldType.Signature:
                            var signatureSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                matchWidth: ko.observable(signatureSettings != null && signatureSettings.matchWidth != null ? signatureSettings.matchWidth : false),
                                matchHeight: ko.observable(signatureSettings != null && signatureSettings.matchHeight != null ? signatureSettings.matchHeight : true)
                            });

                            break;
                        case config.signatureFieldType.Checkbox:
                            var checkboxSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                checkboxBorder: ko.observable(checkboxSettings != null && checkboxSettings.checkboxBorder != null ? checkboxSettings.checkboxBorder : true),
                            });
                            break;
                        default:

                    }
                };
            };

        envelopeField.fromDto = function (dto) {
            var item = new envelopeField().id(dto.id);
            item.name(dto.name)
                .envelopeId(dto.envelopeId)
                .recipientId(dto.recipientId)
                .order(dto.order)
                .regularExpression(dto.regularExpression)
                .getDataFrom(dto.getDataFrom)
                .data(utils.decodeUtf8(dto.data==null?[]:dto.data))
                .fillTimeStamp(dto.fillTimeStamp)
                .fieldType(dto.fieldType)
                .acceptableValuesArray(dto.acceptableValues!=null ? dto.acceptableValues.split(';') : [])
                .defaultValue(dto.defaultValue)
                .tooltip(dto.tooltip)
                .guidanceText(dto.guidanceText)
                .groupName(dto.groupName)
            ;
            if (dto.mandatory != null) item.mandatory(dto.mandatory);
            if (dto.lockDuringSign != null) item.lockDuringSign(dto.lockDuringSign);

            var locations = _.map(dto.locations, function (dtoLocation) {
                var location = envelopeFieldLocation.fromDto(dtoLocation);
                utils.ensureValidFieldWidthAndHeight(location, dto.fieldType);
                return location;
            });

            if (dto.fieldType == config.signatureFieldType.SingleLine || item.fieldType() == config.signatureFieldType.MultiLine || item.fieldType() == config.signatureFieldType.Date)
                item.data.extend({ defaultIfNull: item.defaultValue() });
            
            ko.validation.group(item);
            item.locations(locations);
            item.prepareSettings(dto.fieldType, dto.settings);
            item.dirtyFlag().reset();
            item.fieldType.subscribe(function (newValue) {
                item.prepareSettings(newValue);
            });
            return item;
        };
        envelopeField.blank = function () {
            var item = new envelopeField();
            ko.validation.group(item);
            return item;
        };
        envelopeField.getDtoId = function (dto) { return dto.id; };
        return envelopeField;
    });
define('core/model/model.envelope.fieldlocation',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            envelopeFieldLocation = function () {
                var self = this;
                self.id = ko.observable('');
                self.documentId = ko.observable('');
                self.fieldId = ko.observable('');
                self.page = ko.observable('');
                self.locationX = ko.observable('');
                self.locationY = ko.observable('');
                self.locationWidth = ko.observable('');
                self.locationHeight = ko.observable('');
                self.fontName = ko.observable('');
                self.fontColor = ko.observable('');
                self.fontSize = ko.observable('');
                self.fontBold = ko.observable(false);
                self.fontItalic = ko.observable(false);
                self.fontUnderline = ko.observable(false);
                self.align = ko.observable(0);
                self.order = ko.observable(0);
                self.selected = ko.observable(false);
                self.dirtyFlag = new ko.DirtyFlag([self.fontName, self.fontColor, self.fontSize, self.fontBold, self.fontItalic, self.fontUnderline, self.align]);
            };

        envelopeFieldLocation.fromDto = function (dto) {
            var item = new envelopeFieldLocation().id(dto.id);
            item.documentId(dto.documentId)
                .fieldId(dto.fieldId)
                .page(dto.page)
                .locationX(dto.locationX)
                .locationY(dto.locationY)
                .locationWidth(dto.locationWidth)
                .locationHeight(dto.locationHeight)
                .fontName(dto.fontName)
                .fontColor(dto.fontColor)
                .fontSize(dto.fontSize)
                .fontBold(dto.fontBold)
                .fontItalic(dto.fontItalic)
                .fontUnderline(dto.fontUnderline)
                .align(dto.align)
                .order(dto.order);
            item.dirtyFlag().reset();
            return item;
        };
        envelopeFieldLocation.blank = function () {
            var item = new envelopeFieldLocation();
            return item;
        };
        envelopeFieldLocation.getDtoId = function (dto) { return dto.id; };
        return envelopeFieldLocation;
    });
define('core/model/model.envelope',
    ['ko',
     'lib/underscore',
     'core/utils',
     'core/config',
     'core/model/model.envelope.recipient'],
    function (ko, _, utils, config, envelopeRecipient) {
        var
            envelope = function () {
                var self = this;
                self.id = ko.observable();
                self.name = ko.escapedObservable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 255, message: 'Name too long' } });
                self.creationDateTime = ko.observable();
                self.updatedDateTime = ko.observable();
                self.ownerGuid = ko.observable();
                self.status = ko.observable();
                self.statusDateTime = ko.observable();
                self.reminderTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid reminder time',
                        params: '^[0-9]$'
                    }
                });
                self.stepExpireTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid step expire time',
                        params: '^[0-9]$'
                    }
                });
                self.envelopeExpireTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid envelope expire time',
                        params: '^[0-9]$'
                    }
                });
                self.ownerShouldSign = ko.observable();
                self.orderedSignature = ko.observable();
                self.emailSubject = ko.escapedObservable();
                self.emailBody = ko.escapedObservable();
                self.documentsCount = ko.observable();
                self.documentsPages = ko.observable();
                self.recipients = ko.observableArray([]);
                self.waterMarkText = ko.escapedObservable().extend({ maxLength: { params: 255, message: 'Text too long' } });
                self.waterMarkImage = ko.observable();
                self.attachSignedDocument = ko.observable();
                self.includeViewLink = ko.observable();
                self.canBeCommented = ko.observable();
                self.inPersonSign = ko.observable();
                self.selected = ko.observable(false);
                self.ownerName = ko.observable();
                self.enableTypedSignature = ko.observable();
                self.enableUploadedSignature = ko.observable();
                self.requireUserAuthForSign = ko.observable(false);
                self.requestUserAuthByPhoto = ko.observable(false);
                self.showRecipientCommentInSignedDocument = ko.observable(false);
                self.tags = ko.observable("");
                self.documentNames = ko.observable('');
                self.createdOnFormatted = ko.computed(function () {
                    try {
                        return utils.dateFromIso(self.creationDateTime());
                    } catch (ex) {
                        return "---";
                    }
                });
                self.updatedOnFormatted = ko.computed(function () {
                    try {
                        return utils.dateFromIso(self.updatedDateTime());
                    } catch (ex) {
                        return "---";
                    }
                });
                self.statusCss = ko.computed(function () {
                    switch (self.status()) {
                        case -1:
                            return "sig_state_icon draft";
                        case 0:
                            return "sig_state_icon draft";
                        case 1:
                            return "sig_state_icon inprogress";
                        case 2:
                            return "sig_state_icon expired";
                        case 3:
                            return "sig_state_icon canceled";
                        case 4:
                            return "sig_state_icon failed";
                        case 5:
                            return "sig_state_icon completed";
                        case 6:
                            return "sig_state_icon archived";
                        case 99:
                            return "sig_state_icon inprogress";
                    }
                    return "";
                });
                self.statusTextCss = ko.computed(function () {
                    switch (self.status()) {
                        case -1:
                            return "sig_state_text draft";
                        case 0:
                            return "sig_state_text draft";
                        case 1:
                        case 99:
                            return "sig_state_text pending";
                        case 2:
                            return "sig_state_text failed";
                        case 3:
                            return "sig_state_text failed";
                        case 4:
                            return "sig_state_text failed";
                        case 5:
                            return "sig_state_text completed";
                        case 6:
                            return "sig_state_text archived";
                    }
                    return "";
                });
                self.expirationDate = ko.computed(function () {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.envelopeExpireTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch(ex) {
                        return "";
                    }
                });
                self.reminderDate = ko.computed(function() {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.reminderTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch(ex) {
                        return "";
                    }
                });
                self.stepExpireDate = ko.computed(function() {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.stepExpireTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch (ex) {
                        return "";
                    }
                });
                self.isOwner = ko.computed(function() {
                    try {
                        return self.ownerGuid() == config.userId();
                    } catch (ex) {
                        return false;
                    }
                });
                self.dirtyFlagInfo = new ko.DirtyFlag([
                    self.name,
                    self.emailSubject,
                    self.emailBody,
                    self.orderedSignature,
                    self.attachSignedDocument,
                    self.includeViewLink,
                    self.enableTypedSignature,
                    self.enableUploadedSignature,
                    self.requireUserAuthForSign,
                    self.requestUserAuthByPhoto,
                    self.showRecipientCommentInSignedDocument,
                    self.tags
                ]);
                self.dirtyFlagReminders = new ko.DirtyFlag([self.reminderTime, self.stepExpireTime, self.envelopeExpireTime]);
            };

        envelope.fromDto = function(dto) {
            var item = new envelope().id(dto.id);

            item.name(dto.name)
                .creationDateTime(dto.creationDateTime)
                .updatedDateTime(dto.updatedDateTime)
                .ownerGuid(dto.ownerGuid)
                .status(dto.status)
                .statusDateTime(dto.statusDateTime)
                .reminderTime(dto.reminderTime)
                .stepExpireTime(dto.stepExpireTime)
                .envelopeExpireTime(dto.envelopeExpireTime)
                .ownerShouldSign(dto.ownerShouldSign)
                .orderedSignature(dto.orderedSignature)
                .emailSubject(dto.emailSubject)
                .emailBody(dto.emailBody)
                .documentsCount(dto.documentsCount)
                .documentsPages(dto.documentsPages)
                .recipients(dto.recipients)
                .waterMarkText(dto.waterMarkText)
                .waterMarkImage(dto.waterMarkImage)
                .attachSignedDocument(dto.attachSignedDocument)
                .includeViewLink(dto.includeViewLink)
                .canBeCommented(dto.canBeCommented)
                .inPersonSign(dto.inPersonSign)
                .ownerName(dto.ownerName)
                .enableTypedSignature(dto.enableTypedSignature)
                .enableUploadedSignature(dto.enableUploadedSignature)
                .requireUserAuthForSign(dto.requireUserAuthForSign)
                .requestUserAuthByPhoto(dto.requestUserAuthByPhoto)
                .showRecipientCommentInSignedDocument(dto.showRecipientCommentInSignedDocument)
                .tags(dto.tags)
            ;

            var recipients = _.map(dto.recipients, function(dtoRecipient) {
                return envelopeRecipient.fromDto(dtoRecipient);
            });
            item.recipients(recipients);
            ko.validation.group(item);
            item.dirtyFlagInfo().reset();
            item.dirtyFlagReminders().reset();
            return item;
        };

        envelope.getDtoId = function(dto) { return dto.id; };

        return envelope;
    });
define('core/model/model.envelope.recipient',
    ['ko',
    'core/config',
    'core/utils'
    ],
    function (ko, config,utils) {
        var
            envelopeRecipient = function () {
                var self = this;
                self.id = ko.observable();
                self.firstName = ko.observable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'First name too long' } });
                self.lastName = ko.observable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'Last name too long' } });
                self.fullName = ko.computed(function () {
                    return self.firstName() + ' ' + self.lastName();
                }, self);
                self.email = ko.observable().extend({ required: { message: config.validationMessages.required }, email: { message: config.validationMessages.invalidEmail }, noSpaces: {} });
                self.userGuid = ko.observable();
                self.order = ko.observable();
                self.roleId = ko.observable();                
                self.status = ko.observable();
                self.statusMessage = ko.observable();                
                self.statusDateTime = ko.observable();
                self.delegatedRecipientId = ko.observable();
                self.signatureFingerprint = ko.observable();
                self.signatureHost = ko.observable();
                self.signatureLocation = ko.observable();
                self.signatureBrowser = ko.observable();
                self.comment = ko.observable();
                self.role = ko.computed(function () {
                    if (self.roleId() == 1)
                        return "Owner";
                    else if (self.roleId() == 2)
                        return "Signer";
                    else
                        return "CC";
                }, self);
                self.statusText = ko.computed(function () {
                    try {
                        var status = '';
                        var statusDate = '';
                        var statusComment = '';
                        if (self.status() != 0) {
                            $.each(config.envelopeRecipientStatus, function(i, elem) {
                                if (elem.id == self.status())
                                    status = "<p>" + elem.name;
                            });

                            statusDate = ": " + utils.dateFromIso(self.statusDateTime()) + "</p>";
                            if (self.comment() != '' && self.status()==4) statusComment = "<p>Comment: " + self.comment() + "</p>";
                        }
                        return "<p>" + self.role() + "</p>" + status  + statusDate + statusComment;
                    } catch (ex) {
                        return "";
                    }
                }, self);
                self.statusCss = ko.computed(function() {
                    switch (self.status()) {
                        case -2:
                            return "sig_state_icon expired";
                        case 0:
                            return "sig_state_icon draft";
                        case 1:
                            return "sig_state_icon inprogress";
                        case 2:
                            return "sig_state_icon inprogress";
                        case 3:
                            return "sig_state_icon canceled";
                        case 4:
                            return "sig_state_icon completed";
                    }
                    return "";

                });
                self.dirtyFlag = ko.DirtyFlag([]);
            };

        envelopeRecipient.fromDto = function (dto) {
            var item = new envelopeRecipient().id(dto.id);

            item.firstName(dto.firstName)
                .lastName(dto.lastName)
                .email(dto.email)
                .userGuid(dto.userGuid)
                .order(dto.order)
                .roleId(dto.roleId)
                .status(dto.status)
                .statusMessage(dto.statusMessage)
                .statusDateTime(dto.statusDateTime)
                .delegatedRecipientId(dto.delegatedRecipientId)
                .signatureFingerprint(dto.signatureFingerprint)
                .signatureHost(dto.signatureHost)
                .signatureLocation(dto.signatureLocation)
                .signatureBrowser(dto.signatureBrowser)
                .comment(dto.comment);
            ko.validation.group(item);
            return item;
        };
        
        envelopeRecipient.getDtoId = function (dto) { return dto.id; };
        
        return envelopeRecipient;
});
define('core/model/model.envelope.resource',
    ['ko',
     'lib/underscore',
     'core/utils',
     'core/model/model.envelope.recipient',
     'core/model/model.envelope.document'],
    function (ko, _, utils, envelopeRecipient, envelopeDocument) {
        var
            envelopeResource = function () {
                var self = this;
                self.dates = ko.observableArray();
                self.documents = ko.observableArray();
                self.recipients = ko.observableArray();
                self.tags = ko.observableArray();
                self.statuses = ko.observableArray([
                    { name: ko.observable("Show All"), value: "-6" },
                    { name: ko.observable("Draft"), value: "-1" },
                    { name: ko.observable("Pending"), value: "1" },
                    { name: ko.observable("Expired"), value: "2" },
                    { name: ko.observable("Completed"), value: "5" }
                ]);
            };

        envelopeResource.fromDto = function (dto) {
            var item = new envelopeResource();
            var dates = _.map(dto.dates, function (dtoDocument) {
                var dateArray = dtoDocument.substring(0, dtoDocument.indexOf('T')).split('-');
                var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
                return { name: ko.observable(date.format("mmm dd, yyyy")), value: dtoDocument };
                //return { name: ko.observable(new Date(Date.parse(dtoDocument.substring(0, dtoDocument.indexOf('T')))).format("mmm dd, yyyy")), value: dtoDocument };
            });
            dates.unshift({ name: ko.observable("All Time") });
            item.dates(dates);
            var documents = _.map(dto.documents, function (dtoDocument) {
                return envelopeDocument.fromDto(dtoDocument);
            });
            documents.unshift({ name: ko.observable("Documents"), shortName: ko.observable("Documents") });
            item.documents(documents);
            var recipients = _.map(dto.recipients, function (dtoRecipient) {
                return envelopeRecipient.fromDto(dtoRecipient);
            });
            recipients.unshift({ fullName: ko.observable("Parties") });
            item.recipients(recipients);

            var tags = _.map(dto.tags, function (dtoTag) {
                return { name: ko.observable(dtoTag), value: dtoTag };
            });
            tags.unshift({ name: ko.observable("All Tags") });
            item.tags(tags);
            return item;
        };

        return envelopeResource;
    });
define('core/model/model.field',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            field = function () {
                var self = this;
                self.id = ko.observable('');
                self.name = ko.observable('');
                self.graphSizeW = ko.observable('');
                self.graphSizeH = ko.observable('');
                self.getDataFrom = ko.observable('');
                self.regularExpression = ko.observable('');
                self.fontName = ko.observable('');
                self.fontColor = ko.observable('');
                self.fontSize = ko.observable('');
                self.fontBold = ko.observable('');
                self.fontItalic = ko.observable('');
                self.fontUnderline = ko.observable('');
                self.isSystem = ko.observable('');
                self.fieldType = ko.observable('');
                self.acceptableValues = ko.observable('');
                self.defaultValue = ko.observable('');
                self.align = ko.observable('');
                self.minGraphSizeH = ko.observable(0);
                self.minGraphSizeW = ko.observable(0);
                self.buttonCss = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "field_button sig_field";
                        case config.signatureFieldType.SingleLine:
                            return "field_button singline_field";
                        case config.signatureFieldType.MultiLine:
                            return "field_button multiline_field";
                        case config.signatureFieldType.Date:
                            return "field_button date_field";
                        case config.signatureFieldType.Dropdown:
                            return "field_button dropdown_field";
                        case config.signatureFieldType.Checkbox:
                            return "field_button checkbox_field";
                        case config.signatureFieldType.File:
                            return "field_button file_field";
                        case config.signatureFieldType.Stamp:
                            return "field_button stamp_field";
                    }
                    return "";
                });
                self.dragText = ko.computed(function() {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "Place Signature";
                        case config.signatureFieldType.SingleLine:
                            return "Place Single Line";
                        case config.signatureFieldType.MultiLine:
                            return "Place Multiline Text";
                        case config.signatureFieldType.Date:
                            return "Place Date";
                        case config.signatureFieldType.Dropdown:
                            return "Place Dropdown";
                        case config.signatureFieldType.Checkbox:
                            return "Place Checkbox";
                        case config.signatureFieldType.File:
                            return "Place File";
                        case config.signatureFieldType.Stamp:
                            return "Place Stamp";
                    }
                    return "";
                });
            };

        field.fromDto = function (dto) {
            var item = new field().id(dto.id);

            item.name(dto.name)
                .graphSizeW(dto.graphSizeW)
                .graphSizeH(dto.graphSizeH)
                .getDataFrom(dto.getDataFrom)
                .regularExpression(dto.regularExpression)
                .fontName(dto.fontName)
                .fontColor(dto.fontColor)
                .fontSize(dto.fontSize)
                .fontBold(dto.fontBold)
                .fontItalic(dto.fontItalic)
                .fontUnderline(dto.fontUnderline)
                .isSystem(dto.isSystem)
                .fieldType(dto.fieldType)
                .acceptableValues(dto.acceptableValues)
                .defaultValue(dto.defaultValue)
                .align(dto.align)
                .minGraphSizeW(dto.minGraphSizeW)
                .minGraphSizeH(dto.minGraphSizeH);

            return item;
        };
        field.blank = function () {
            var item = new field();
            return item;
        };
        field.getDtoId = function (dto) { return dto.id; };
        return field;
    });
define('core/model/model.form.document',
    ['ko', 'core/config'],
    function (ko, config) {
        var
            formDocument = function () {
                var self = this;
                self.id = ko.observable();
                self.name = ko.observable();
                self.formGuid = ko.observable();
                self.documentGuid = ko.observable();
                self.originalDocumentGuid = ko.observable();
                self.originalDocumentMD5 = ko.observable();
                self.assignedDateTime = ko.observable();
                self.order = ko.observable();
                self.shortName = ko.computed(function() {
                    if (self.name() && self.name().length > 25)
                        return self.name().substring(0, 22) + "...";
                    else
                        return self.name();
                });
                self.viewedOnSign = ko.computed({
                    read: function () {
                        if (!config.checkHtml5StorageSupport() || self.documentGuid() == null) return true;
                        try {
                            self.name(); // to force re-evaluate when call name.notifySubscribers()
                            return localStorage.getItem("form.document." + self.documentGuid()) != null;
                        } catch (e) {
                            return true;
                        };
                    },
                    write: function (value) {
                        if (config.checkHtml5StorageSupport()) {
                            try {
                                localStorage.setItem("form.document." + self.documentGuid(), value);
                            } catch (e) {
                                localStorage.clear();
                            }
                        }
                    },
                    owner: this
                });
            };

        formDocument.fromDto = function (dto) {
            var item = new formDocument().id(dto.id);

            item.name(dto.name)
                .formGuid(dto.formGuid)
                .name(dto.name)
                .documentGuid(dto.documentGuid)
                .originalDocumentGuid(dto.originalDocumentGuid)
                .originalDocumentMD5(dto.originalDocumentMD5)
                .assignedDateTime(dto.assignedDateTime)
                .order(dto.order);
            return item;
        };

        formDocument.getDtoId = function (dto) { return dto.documentId; };

        return formDocument;
    });
define('core/model/model.form.field',
    ['ko',
    'core/config',
    'core/utils',
    'core/model/model.form.fieldlocation'
    ],
    function (ko, config, utils, formFieldLocation) {
        var
            formField = function () {
                var self = this;
                self.id = ko.observable('');
                self.formGuid = ko.observable('');
                self.participantGuid = ko.observable('');
                self.name = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } });
                self.mandatory = ko.observable('');
                self.regularExpression = ko.observable('');
                self.data = ko.observable('');
                self.fillTimeStamp = ko.observable('');
                self.locations = ko.observableArray([]);
                self.fieldType = ko.observable('');
                self.acceptableValuesArray = ko.observableArray([]);//keep the same as envelope fields, dto name is acceptableValues
                self.defaultValue = ko.escapedObservable('');
                self.tooltip = ko.escapedObservable('');
                self.guidanceText = ko.escapedObservable('');
                self.groupName = ko.escapedObservable('');
                self.settings = ko.observable();
                self.progress = ko.observable(0);
                self.lockDuringSign = ko.observable(true);
                self.templateName = ko.computed(function() {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "signature-field-template";
                        case config.signatureFieldType.SingleLine:
                            return "singleline-field-template";
                        case config.signatureFieldType.MultiLine:
                            return "multiline-field-template";
                        case config.signatureFieldType.Date:
                            return "date-field-template";
                        case config.signatureFieldType.Dropdown:
                            return "dropdown-field-template";
                        case config.signatureFieldType.Checkbox:
                            return "checkbox-field-template";
                        case config.signatureFieldType.File:
                            return "file-field-template";
                        case config.signatureFieldType.Stamp:
                            return "stamp-field-template";
                    }
                    return "";
                });
                self.labelText = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "Signature";
                        case config.signatureFieldType.SingleLine:
                            return "Single line";
                        case config.signatureFieldType.MultiLine:
                            return "Multi line";
                        case config.signatureFieldType.Date:
                            return "Date";
                        case config.signatureFieldType.Dropdown:
                            return "Drop-down";
                        case config.signatureFieldType.Checkbox:
                            return "Checkbox";
                        case config.signatureFieldType.File:
                            return "File";
                        case config.signatureFieldType.Stamp:
                            return "Stamp";
                    }
                    return "";
                });
                self.acceptableValues = ko.computed(function () {
                    return self.acceptableValuesArray().join(";");
                });
                self.dirtyFlag = new ko.DirtyFlag([self.name, self.defaultValue, self.tooltip, self.acceptableValues, self.guidanceText, self.groupName, self.mandatory, self.regularExpression, self.settings]);

                self.prepareSettings = function (filedType, settingsJson) {
                    if (settingsJson == undefined)
                        settingsJson = {};
                    switch (filedType) {
                        case config.signatureFieldType.Date:
                            var dateSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                showMonthYearDropdowns: ko.observable(dateSettings != null && dateSettings.showMonthYearDropdowns != null ? dateSettings.showMonthYearDropdowns : true),
                                minYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.minYear : new Date().getFullYear() - 99).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                maxYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.maxYear : new Date().getFullYear() + 30).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                dateFormat: ko.observable(dateSettings != null && dateSettings.dateFormat != null ? dateSettings.dateFormat : "dd.mm.yy")
                            });
                            ko.validation.group(self.settings);
                            break;
                        case config.signatureFieldType.Signature:
                            var signatureSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                matchWidth: ko.observable(signatureSettings != null && signatureSettings.matchWidth != null ? signatureSettings.matchWidth : false),
                                matchHeight: ko.observable(signatureSettings != null && signatureSettings.matchHeight != null ? signatureSettings.matchHeight : true)
                            });
                        
                            break;
                        case config.signatureFieldType.Checkbox:
                            var checkboxSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                checkboxBorder: ko.observable(checkboxSettings != null && checkboxSettings.checkboxBorder != null ? checkboxSettings.checkboxBorder : true),
                            });
                            break;
                        default:
                      
                    }
                };
                
            };

        formField.fromDto = function (dto) {
            var item = new formField().id(dto.id);

            item.name(dto.name)
                .formGuid(dto.formGuid)
                .participantGuid(dto.participantGuid)
                .mandatory(dto.mandatory)
                .regularExpression(dto.regularExpression)
                .data(utils.decodeUtf8(dto.data==null?[]:dto.data))
                .fillTimeStamp(dto.fillTimeStamp)
                .fieldType(dto.fieldType)
                .acceptableValuesArray(dto.acceptableValues != null ? dto.acceptableValues.split(';') : [])
                .defaultValue(dto.defaultValue)
                .tooltip(dto.tooltip)
                .guidanceText(dto.guidanceText)
                .groupName(dto.groupName);

            var locations = _.map(dto.locations, function (dtoLocation) {
                var location = formFieldLocation.fromDto(dtoLocation);
                utils.ensureValidFieldWidthAndHeight(location, dto.fieldType);
                return location;
            });
            
            item.locations(locations);
            ko.validation.group(item);
            item.prepareSettings(dto.fieldType, dto.settings);
            item.dirtyFlag().reset();
            
            item.fieldType.subscribe(function(newValue) {
                item.prepareSettings(newValue);
            });
            return item;
        };
        formField.blank = function () {
            var item = new formField();
            ko.validation.group(item);
            return item;
        };
        formField.getDtoId = function (dto) { return dto.id; };
        return formField;
    });
define('core/model/model.form.fieldlocation',
    ['ko'],
    function (ko) {
        var
            formFieldLocation = function () {
                var self = this;
                self.id = ko.observable('');
                self.documentGuid = ko.observable('');
                self.fieldGuid = ko.observable('');
                self.page = ko.observable('');
                self.locationX = ko.observable('');
                self.locationY = ko.observable('');
                self.locationWidth = ko.observable('');
                self.locationHeight = ko.observable('');
                self.fontName = ko.observable('');
                self.fontColor = ko.observable('');
                self.fontSize = ko.observable('');
                self.fontBold = ko.observable(false);
                self.fontItalic = ko.observable(false);
                self.fontUnderline = ko.observable(false);
                self.align = ko.observable('');
                self.order = ko.observable(0);
                self.selected = ko.observable(false);
                self.dirtyFlag = new ko.DirtyFlag([self.fontName, self.fontColor, self.fontSize, self.fontBold, self.fontItalic, self.fontUnderline, self.align]);
            };

        formFieldLocation.fromDto = function (dto) {
            var item = new formFieldLocation().id(dto.id);
            item.documentGuid(dto.documentGuid)
                .fieldGuid(dto.fieldGuid)
                .page(dto.page)
                .locationX(dto.locationX)
                .locationY(dto.locationY)
                .locationWidth(dto.locationWidth)
                .locationHeight(dto.locationHeight)
                .fontName(dto.fontName)
                .fontColor(dto.fontColor)
                .fontSize(dto.fontSize)
                .fontBold(dto.fontBold)
                .fontItalic(dto.fontItalic)
                .fontUnderline(dto.fontUnderline)
                .align(dto.align)
                .order(dto.order);
            ;
            item.dirtyFlag().reset();
            return item;
        };
        formFieldLocation.blank = function () {
            var item = new formFieldLocation();
            return item;
        };
        formFieldLocation.getDtoId = function (dto) { return dto.id; };
        return formFieldLocation;
    });
define('core/model/model.form',
    ['ko',
     'lib/underscore',
     'core/config'],
    function (ko, _, config) {
        var
            form = function () {
                var self = this;
                self.id = ko.observable();
                self.name = ko.escapedObservable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 255, message: 'Name too long' } });
                self.createdTimeStamp = ko.observable();
                self.ownerGuid = ko.observable();
                self.templateGuid = ko.observable();
                self.status = ko.observable();
                self.statusDateTime = ko.observable();
                self.documentsCount = ko.observable();
                self.documentsPages = ko.observable();
                self.participantsCount = ko.observable();
                self.fieldsInFinalFileName = ko.observableArray([]);
                self.canParticipantDownloadForm = ko.observable();
                self.canParticipantPrintForm = ko.observable();
                self.waterMarkText = ko.escapedObservable().extend({ maxLength: { params: 255, message: 'Text too long' } });
                self.waterMarkImage = ko.observable();
                self.fieldsCount = ko.observable();
                self.selected = ko.observable(false);
                self.notifyOwnerOnSign = ko.observable(false);
                self.attachSignedDocument = ko.observable(false);
                self.requireUserAuthForSign = ko.observable(false);
                self.requestUserAuthByPhoto = ko.observable(false);
                self.enableTypedSignature = ko.observable();
                self.enableUploadedSignature = ko.observable();
                self.requireUserIdentityValidation = ko.observable();
                self.canBeCommented = ko.observable();
                self.showParticipantCommentInSignedDocument = ko.observable();
                self.tags = ko.observable("");
                self.parseFields = ko.observable(false);

                self.notifyOtherOnSign = ko.observable().extend({ pattern: { message: config.validationMessages.invalidEmail, params: /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/ } });
                self.documentNames = ko.observable('');
                self.statusIconCss = ko.computed(function () {
                    switch (self.status()) {
                        case -1:
                            return "sig_state_icon draft";
                        case 1:
                            return "sig_state_icon inprogress";
                        case 2:
                            return "sig_state_icon completed";
                        case 3:
                            return "sig_state_icon archived";
                    }
                    return "";
                });
                self.statusText = ko.computed(function () {
                    switch (self.status()) {
                        case -1:
                            return "Draft";
                        case 1:
                            return "In progress";
                        case 2:
                            return "Completed";
                        case 3:
                            return "Archived";
                    }
                    return "";
                });
                self.statusTextCss = ko.computed(function () {
                    switch (self.status()) {
                        case -1:
                            return "sig_state_text draft";
                        case 1:
                            return "sig_state_text pending";
                        case 2:
                            return "sig_state_text completed";
                        case 3:
                            return "sig_state_text archived";
                    }
                    return "";
                });
                self.participantsSigned = ko.computed(function () {
                    return "Participants signed: " + self.participantsCount();
                });
                self.dirtyFlag = ko.DirtyFlag([
                    self.name, self.canParticipantDownloadForm, self.canParticipantPrintForm, self.waterMarkText,
                    self.notifyOwnerOnSign, self.attachSignedDocument, self.fieldsInFinalFileName, self.notifyOtherOnSign, self.requireUserAuthForSign, self.requestUserAuthByPhoto,
                    self.enableTypedSignature, self.enableUploadedSignature, self.requireUserIdentityValidation, self.showParticipantCommentInSignedDocument,
                    self.canBeCommented,
                    self.tags
                ]);
            };

        form.fromDto = function (dto) {
            var item = new form().id(dto.id);

            item.name(dto.name)
                .createdTimeStamp(dto.creationDateTime)
                .ownerGuid(dto.ownerGuid)
                .status(dto.status)
                .statusDateTime(dto.statusDateTime)
                .templateGuid(dto.templateGuid)
                .documentsCount(dto.documentsCount)
                .documentsPages(dto.documentsPages)
                .participantsCount(dto.participantsCount)
                .fieldsInFinalFileName(dto.fieldsInFinalFileName)
                .canParticipantDownloadForm(dto.canParticipantDownloadForm)
                .canParticipantPrintForm(dto.canParticipantPrintForm)
                .waterMarkText(dto.waterMarkText)
                .waterMarkImage(dto.waterMarkImage)
                .fieldsCount(dto.fieldsCount)
                .notifyOwnerOnSign(dto.notifyOwnerOnSign)
                .attachSignedDocument(dto.attachSignedDocument)
                .notifyOtherOnSign(dto.notifyOtherOnSign)
                .requireUserAuthForSign(dto.requireUserAuthForSign)
                .requestUserAuthByPhoto(dto.requestUserAuthByPhoto)
                .enableTypedSignature(dto.enableTypedSignature)
                .enableUploadedSignature(dto.enableUploadedSignature)
                .requireUserIdentityValidation(dto.requireUserIdentityValidation)
                .showParticipantCommentInSignedDocument(dto.showParticipantCommentInSignedDocument)
                .canBeCommented(dto.canBeCommented)
                .tags(dto.tags)
                .parseFields(dto.parseFields)
            ;

            ko.validation.group(item);
            item.dirtyFlag().reset();
            return item;
        };

        form.getDtoId = function (dto) { return dto.id; };

        return form;
    });
define('core/model/model.form.participant',
    ['ko','core/utils'],
    function (ko, utils) {
        var
            formParticipant = function () {
                var self = this;
                self.id = ko.observable();
                self.name = ko.observable();
                self.email = ko.observable();
                self.comment = ko.observable();
                self.fillDateTime = ko.observable();
                self.status = ko.observable();
                self.signedDocuments = ko.observableArray();
            };
        var formParticipantDocuments = function() {
            var self = this;
            self.documentGuid = ko.observable();
            self.name = ko.observable();
        };

        formParticipant.fromDto = function (dto) {
            var item = new formParticipant().id(dto.id);
            item.name(dto.name)
                .email(dto.email)
                .comment(dto.comment)
                .fillDateTime(dto.fillDateTime!=null ? utils.dateFromIso(dto.fillDateTime): null)
                .status(dto.status)
            ;
            var documents = _.map(dto.signedDocuments, function (dtoDocument) {
                var doc = new formParticipantDocuments();
                doc.documentGuid(dtoDocument.documentGuid)
                    .name(dtoDocument.name);
                return doc;
            });
            item.signedDocuments(documents);
            return item;
        };

        formParticipant.getDtoId = function (dto) { return dto.id; };
        return formParticipant;
    });
define('core/model/model.form.resource',
    ['ko',
     'lib/underscore',
     'core/utils',
     'core/model/model.form.document'],
    function (ko, _, utils, formDocument) {
        var
            formResource = function () {
                var self = this;
                self.dates = ko.observableArray();
                self.documents = ko.observableArray();
                self.tags = ko.observableArray();
                self.statuses = ko.observableArray([
                    { name: ko.observable("Show All"), value: "-6" },
                    { name: ko.observable("Draft"), value: "-1" },
                    { name: ko.observable("In progress"), value: "1" },
                    { name: ko.observable("Completed"), value: "2" }
                ]);
            };

        formResource.fromDto = function (dto) {
            var item = new formResource();
            var dates = _.map(dto.dates, function (dtoDocument) {
                var dateArray = dtoDocument.substring(0, dtoDocument.indexOf('T')).split('-');
                var date = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
                return { name: ko.observable(date.format("mmm dd, yyyy")), value: dtoDocument };
                //return { name: ko.observable(new Date(Date.parse(dtoDocument.substring(0, dtoDocument.indexOf('T')))).format("mmm dd, yyyy")), value: dtoDocument };
            });
            dates.unshift({ name: ko.observable("All Time") });
            item.dates(dates);
            var documents = _.map(dto.documents, function (dtoDocument) {
                return formDocument.fromDto(dtoDocument);
            });
            documents.unshift({ name: ko.observable("Documents"), shortName: ko.observable("Documents") });
            item.documents(documents);

            var tags = _.map(dto.tags, function (dtoTag) {
                return { name: ko.observable(dtoTag), value: dtoTag };
            });
            tags.unshift({ name: ko.observable("All Tags") });
            item.tags(tags);
            return item;
        };

        return formResource;
    });
define('core/model/model.predefinedlist',
    ['ko',
     'lib/underscore',
     'core/utils'],
    function (ko, _, utils) {
        var
            predefinedList = function () {
                var self = this;
                self.id = ko.observable('');
                self.name = ko.observable('');
                self.values = ko.observableArray([]);
                self.defaultValue = ko.observable('');
            };

        predefinedList.fromDto = function (dto) {
            var item = new predefinedList().id(dto.id);
            item.name(dto.name)
                .values(dto.values.split(';'))
                .defaultValue(dto.defaultValue);

            return item;
        };

        return predefinedList;
    });
define('core/model/model.signature',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            signature = function () {
                var self = this;
                self.id = ko.observable('');
                self.userGuid = ko.observable('');
                self.recipientId = ko.observable('');
                self.name = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 150, message: 'Name too long' } });
                self.companyName = ko.escapedObservable('').extend({ maxLength: { params: 150, message: 'Company too long' } });
                self.position = ko.escapedObservable('').extend({ maxLength: { params: 150, message: 'Position too long' } });;
                self.firstName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 80, message: 'First name too long' }  });
                self.lastName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 80, message: 'Last name too long' } } );
                self.fullName = ko.escapedObservable(function () {
                    return self.firstName() + ' ' + self.lastName();
                }, self);
                self.textInitials = ko.escapedObservable('').extend({ maxLength: { params: 10, message: 'Initials too long' } });
                self.signatureImageFileId = ko.observable('');
                self.initialsImageFileId = ko.observable('');
                self.signatureImageUrl = ko.observable('').extend({ required: { message: config.validationMessages.required } });
                self.initialsImageUrl = ko.observable('');
                self.createdTimeStamp = ko.observable('');
                self.selected = ko.observable(false);
                self.companyAndPosition = ko.computed(function () {
                    if (self.companyName() != '' && self.position() != '')
                        return self.companyName() + ' / ' + self.position();
                    else if (self.companyName() != '')
                        return self.companyName();
                    else return self.position();
                });
            };

        signature.fromDto = function (dto) {
            var item = new signature().id(dto.id);

            item.firstName(dto.firstName)
                .lastName(dto.lastName)
                .userGuid(dto.userGuid)
                .recipientId(dto.recipientId)
                .name(dto.name)
                .companyName($.trim(dto.companyName))
                .position(dto.position)
                .textInitials(dto.textInitials)
                .signatureImageFileId(dto.signatureImageFileId)
                .initialsImageFileId(dto.initialsImageFileId)
                .signatureImageUrl(dto.signatureImageUrl)
                .initialsImageUrl(dto.initialsImageUrl)
                .createdTimeStamp(dto.createdTimeStamp);
            ko.validation.group(item);
            return item;
        };
        signature.blank = function () {
            var item = new signature();
            ko.validation.group(item);
            return item;
        };
        signature.getDtoId = function (dto) { return dto.id; };

        return signature;
    });
define('core/model/model.template.document',
    ['ko'],
    function (ko) {
        var
            templateDocument = function () {
                var self = this;
                self.documentId = ko.observable();
                self.templateId = ko.observable();
                self.order = ko.observable();
                self.name = ko.observable();
                self.originalDocumentMD5 = ko.observable();
                self.finalDocumentMD5 = ko.observable();
                self.originalDocumentPagesCount = ko.observable();
                self.fieldsCount = ko.observable();
                self.originalDocumentImportedFields = ko.observableArray();
                self.totalPages = ko.computed(function () {
                    return "(Total pages: " + self.originalDocumentPagesCount() + ")";
                }, self);
                self.originalDocumentId = ko.observable();
                self.shortName = ko.computed(function () {
                    if (self.name() && self.name().length > 25)
                        return self.name().substring(0, 22) + "...";
                    else
                        return self.name();
                });

            };

        templateDocument.fromDto = function (dto) {
            var item = new templateDocument().documentId(dto.documentId);

            item.templateId(dto.templateId)
                .order(dto.order)
                .name(dto.name)
                .originalDocumentMD5(dto.originalDocumentMD5)
                .finalDocumentMD5(dto.finalDocumentMD5)
                .originalDocumentPagesCount(dto.originalDocumentPagesCount)
                .fieldsCount(dto.fieldsCount)
                .originalDocumentId(dto.originalDocumentId);
            return item;
        };

        templateDocument.getDtoId = function (dto) { return dto.documentId; };

        return templateDocument;
    });
define('core/model/model.template.field',
    ['ko',
    'core/config',
    'core/utils',
    'core/model/model.template.fieldlocation'
    ],
    function (ko, config, utils, templateFieldLocation) {
        var
            templateField = function () {
                var self = this;
                self.id = ko.observable('');
                self.templateId = ko.observable('');
                self.recipientId = ko.observable('');
                self.name = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } });
                self.mandatory = ko.observable('');
                self.order = ko.observable('');
                self.regularExpression = ko.escapedObservable('');
                self.getDataFrom = ko.observable('');
                self.data = ko.observable('');
                self.fillTimeStamp = ko.observable('');
                self.signatureFieldId = ko.observable('');
                self.locations = ko.observableArray([]);
                self.fieldType = ko.observable('');
                self.acceptableValuesArray = ko.observableArray([]);
                self.defaultValue = ko.escapedObservable('');
                self.tooltip = ko.escapedObservable('');
                self.guidanceText = ko.escapedObservable('');
                self.groupName = ko.escapedObservable('');
                self.settings = ko.observable();
                self.lockDuringSign = ko.observable(true);
                self.templateName = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "signature-field-template";
                        case config.signatureFieldType.SingleLine:
                            return "singleline-field-template";
                        case config.signatureFieldType.MultiLine:
                            return "multiline-field-template";
                        case config.signatureFieldType.Date:
                            return "date-field-template";
                        case config.signatureFieldType.Dropdown:
                            return "dropdown-field-template";
                        case config.signatureFieldType.Checkbox:
                            return "checkbox-field-template";
                        case config.signatureFieldType.File:
                            return "file-field-template";
                        case config.signatureFieldType.Stamp:
                            return "stamp-field-template";
                    }
                    return "";
                });
                self.fieldTypeText = ko.computed(function () {
                    switch (self.fieldType()) {
                        case config.signatureFieldType.Signature:
                            return "Signature";
                        case config.signatureFieldType.SingleLine:
                            return "Single line text field";
                        case config.signatureFieldType.MultiLine:
                            return "Multi line text field";
                        case config.signatureFieldType.Date:
                            return "Date";
                        case config.signatureFieldType.Dropdown:
                            return "Dropdown";
                        case config.signatureFieldType.Checkbox:
                            return "Checkbox";
                        case config.signatureFieldType.File:
                            return "File";
                        case config.signatureFieldType.Stamp:
                            return "Stamp";
                    }
                    return "";
                });
                self.acceptableValues = ko.computed(function () {
                    return self.acceptableValuesArray().join(";");
                });
                //self.dirtyFlag = new ko.DirtyFlag([self.name, self.regularExpression, self.acceptableValuesArray, self.defaultValue, self.tooltip]);
                self.dirtyFlag = new ko.DirtyFlag([self.name, self.defaultValue, self.tooltip, self.acceptableValues, self.guidanceText, self.recipientId, self.groupName, self.mandatory, self.regularExpression, self.settings]);
                
                self.prepareSettings = function (filedType, settingsJson) {
                    if (settingsJson == undefined)
                        settingsJson = {};
                    switch (filedType) {
                        case config.signatureFieldType.Date:
                            var dateSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                showMonthYearDropdowns: ko.observable(dateSettings != null && dateSettings.showMonthYearDropdowns != null ? dateSettings.showMonthYearDropdowns : true),
                                minYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.minYear : new Date().getFullYear() - 99).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                maxYear: ko.observable(dateSettings != null && dateSettings.minYear != null ? dateSettings.maxYear : new Date().getFullYear() + 30).extend({ required: { message: config.validationMessages.required }, number: true, min: 1900, max: 9999 }),
                                dateFormat: ko.observable(dateSettings != null && dateSettings.dateFormat != null ? dateSettings.dateFormat : "dd.mm.yy")
                            });
                            ko.validation.group(self.settings);
                            break;
                        case config.signatureFieldType.Signature:
                            var signatureSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                matchWidth: ko.observable(signatureSettings != null && signatureSettings.matchWidth != null ? signatureSettings.matchWidth : false),
                                matchHeight: ko.observable(signatureSettings != null && signatureSettings.matchHeight != null ? signatureSettings.matchHeight : true)
                            });

                            break;
                        case config.signatureFieldType.Checkbox:
                            var checkboxSettings = ko.utils.parseJson(settingsJson);
                            self.settings({
                                checkboxBorder: ko.observable(checkboxSettings != null && checkboxSettings.checkboxBorder != null ? checkboxSettings.checkboxBorder : true),
                            });
                            break;
                        default:

                    }
                };
            };

        templateField.fromDto = function (dto) {
            var item = new templateField().id(dto.id);

            item.name(dto.name)
                .templateId(dto.templateId)
                .recipientId(dto.recipientId)
                .mandatory(dto.mandatory)
                .order(dto.order)
                .regularExpression(dto.regularExpression)
                .getDataFrom(dto.getDataFrom)
                .data(utils.decodeUtf8(String, dto.data))
                .fillTimeStamp(dto.fillTimeStamp)
                .fieldType(dto.fieldType)
                .acceptableValuesArray(dto.acceptableValues != null ? dto.acceptableValues.split(';') : [])
                .defaultValue(dto.defaultValue)
                .tooltip(dto.tooltip)
                .guidanceText(dto.guidanceText)
                .groupName(dto.groupName);

            var locations = _.map(dto.locations, function (dtoLocation) {
                var location = templateFieldLocation.fromDto(dtoLocation);
                utils.ensureValidFieldWidthAndHeight(location, dto.fieldType);
                return location;
            });
            
            
            ko.validation.group(item);
            item.locations(locations);
            item.prepareSettings(dto.fieldType, dto.settings);
            item.dirtyFlag().reset();
            item.fieldType.subscribe(function (newValue) {
                item.prepareSettings(newValue);
            });
            return item;
        };
        templateField.blank = function () {
            var item = new templateField();
            ko.validation.group(item);
            return item;
        };
        templateField.getDtoId = function (dto) { return dto.id; };
        return templateField;
    });
define('core/model/model.template.fieldlocation',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            templateFieldLocation = function () {
                var self = this;
                self.id = ko.observable('');
                self.documentId = ko.observable('');
                self.fieldId = ko.observable('');
                self.page = ko.observable('');
                self.locationX = ko.observable('');
                self.locationY = ko.observable('');
                self.locationWidth = ko.observable('');
                self.locationHeight = ko.observable('');
                self.fontName = ko.observable('');
                self.fontColor = ko.observable('');
                self.fontSize = ko.observable('');
                self.fontBold = ko.observable(false);
                self.fontItalic = ko.observable(false);
                self.fontUnderline = ko.observable(false);
                self.align = ko.observable(0);
                self.selected = ko.observable(false);
                self.dirtyFlag = new ko.DirtyFlag([self.fontName, self.fontColor, self.fontSize, self.fontBold, self.fontItalic, self.fontUnderline, self.align]);
            };

        templateFieldLocation.fromDto = function (dto) {
            var item = new templateFieldLocation().id(dto.id);
            item.documentId(dto.documentId)
                .fieldId(dto.fieldId)
                .page(dto.page)
                .locationX(dto.locationX)
                .locationY(dto.locationY)
                .locationWidth(dto.locationWidth)
                .locationHeight(dto.locationHeight)
                .fontName(dto.fontName)
                .fontColor(dto.fontColor)
                .fontSize(dto.fontSize)
                .fontBold(dto.fontBold)
                .fontItalic(dto.fontItalic)
                .fontUnderline(dto.fontUnderline)
                .align(dto.align);
            item.dirtyFlag().reset();
            return item;
        };
        templateFieldLocation.blank = function () {
            var item = new templateFieldLocation();
            return item;
        };
        templateFieldLocation.getDtoId = function (dto) { return dto.id; };
        return templateFieldLocation;
    });
define('core/model/model.template',
    ['ko',
     'lib/underscore',
     'core/utils',
     'core/model/model.template.recipient'],
    function (ko, _, utils, templateRecipient) {
        var
            template = function () {
                var self = this;
                self.id = ko.observable();
                self.name = ko.escapedObservable().extend({ required: true, maxLength: { params: 255, message: 'Name too long' } });
                self.ownerGuid = ko.observable();
                self.reminderTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid reminder time',
                        params: '^[0-9]$'
                    }
                });
                self.stepExpireTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid step expire time',
                        params: '^[0-9]$'
                    }
                });
                self.templateExpireTime = ko.observable().extend({
                    require: true,
                    pattern: {
                        message: 'Invalid template expire time',
                        params: '^[0-9]$'
                    }
                });
                self.ownerShouldSign = ko.observable();
                self.orderedSignature = ko.observable();
                self.emailSubject = ko.escapedObservable();
                self.emailBody = ko.escapedObservable();
                self.documentsCount = ko.observable();
                self.documentsPages = ko.observable();
                self.recipients = ko.observableArray([]);
                self.waterMarkText = ko.escapedObservable().extend({ maxLength: { params: 255, message: 'Text too long' } });
                self.waterMarkImage = ko.observable();
                self.enableTypedSignature = ko.observable();
                self.enableUploadedSignature = ko.observable();
                self.tags = ko.observable("");

                self.expirationDate = ko.computed(function () {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.templateExpireTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch (ex) {
                        return "";
                    }
                });
                self.reminderDate = ko.computed(function () {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.reminderTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch (ex) {
                        return "";
                    }
                });
                self.stepExpireDate = ko.computed(function () {
                    try {
                        var today = new Date();
                        var expiration = new Date(today.getTime() + self.stepExpireTime() * 24 * 60 * 60 * 1000);
                        return expiration.format("dd mmm yyyy");
                    } catch (ex) {
                        return "";
                    }
                });
                self.fieldsCount = ko.observable();
                self.selected = ko.observable(false);
            };

        template.fromDto = function (dto) {
            var item = new template().id(dto.id);

            item.name(dto.name)
                .ownerGuid(dto.ownerGuid)
                .reminderTime(dto.reminderTime)
                .stepExpireTime(dto.stepExpireTime)
                .templateExpireTime(dto.templateExpireTime)
                .ownerShouldSign(dto.ownerShouldSign)
                .orderedSignature(dto.orderedSignature)
                .emailSubject(dto.emailSubject)
                .emailBody(dto.emailBody)
                .documentsCount(dto.documentsCount)
                .documentsPages(dto.documentsPages)
                .recipients(dto.recipients)
                .waterMarkText(dto.waterMarkText)
                .waterMarkImage(dto.waterMarkImage)
                .fieldsCount(dto.fieldsCount)
                .enableTypedSignature(dto.enableTypedSignature)
                .enableUploadedSignature(dto.enableUploadedSignature)
                .tags(dto.tags)
            ;

            var recipients = _.map(dto.recipients, function (dtoRecipient) {
                return templateRecipient.fromDto(dtoRecipient);
            });
            item.recipients(recipients);

            return item;
        };

        template.getDtoId = function (dto) { return dto.id; };

        return template;
    });
define('core/model/model.template.recipient',
    ['ko',
    'core/config'
    ],
    function (ko, config) {
        var
            templateRecipient = function () {
                var self = this;
                self.id = ko.observable();
                self.nickname = ko.observable().extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'Name too long' } });
                self.order = ko.observable();
                self.roleId = ko.observable();
                self.role = ko.computed(function () {
                    if (self.roleId() == 1)
                        return "Owner";
                    else if (self.roleId() == 2)
                        return "Signer";
                    else
                        return "CC";
                }, self);;
            };

        templateRecipient.fromDto = function (dto) {
            var item = new templateRecipient().id(dto.id);

            item.nickname(dto.nickname)
                .order(dto.order)
                .roleId(dto.roleId);
            ko.validation.group(item);
            return item;
        };

        templateRecipient.getDtoId = function (dto) { return dto.id; };

        return templateRecipient;
    });
define('core/model/model.template.resource',
    ['ko',
     'lib/underscore',
     'core/utils',
     'core/model/model.template.recipient',
     'core/model/model.template.document'],
    function (ko, _, utils, templateRecipient, templateDocument) {
        var
            templateResource = function () {
                var self = this;
                self.documents = ko.observableArray();
                self.recipients = ko.observableArray();
                self.tags = ko.observableArray();
            };

        templateResource.fromDto = function (dto) {
            var item = new templateResource();
            var documents = _.map(dto.documents, function (dtoDocument) {
                return templateDocument.fromDto(dtoDocument);
            });
            documents.unshift({ name: ko.observable("Documents"), shortName: ko.observable("Documents") });
            item.documents(documents);
            var recipients = _.map(dto.recipients, function (dtoRecipient) {
                return templateRecipient.fromDto(dtoRecipient);
            });
            recipients.unshift({ nickname: ko.observable("Parties") });
            item.recipients(recipients);

            var tags = _.map(dto.tags, function (dtoTag) {
                return { name: ko.observable(dtoTag), value: dtoTag };
            });
            tags.unshift({ name: ko.observable("All Tags") });
            item.tags(tags);
            return item;
        };

        return templateResource;
    });
define('core/redirect',
    [
        'core/config'
    ],
    function (config) {
        var routes = config.routes,
            viewDocument = function (documentId) {
                window.location.href = routes.viewDocumentUrl(documentId);
            },
            viewDocumentEmbed = function (documentId) {
                window.location.href = routes.viewDocumentEmbedUrl(documentId);
            },
            envelopeView = function (envelopeId) {
                window.location.href = routes.envelopeViewUrl(envelopeId);
            },
            envelopeSigned = function(envelopeId) {
                window.location.href = routes.envelopeSignedUrl(envelopeId);
            },
            embedEnvelopeSigned = function (envelopeId, recipientId) {
                window.location.href = routes.embedEnvelopeSignedUrl(envelopeId, recipientId);
            },
            envelopeSign = function (envelopeId) {
                window.location.href = routes.envelopeSignUrl(envelopeId);
            },
            embedEnvelopeSign = function (envelopeId, recipientId) {
                //console.log(routes.embedSignEnvelopeUrl(envelopeId, recipientId));
                window.location.href = routes.embedSignEnvelopeUrl(envelopeId, recipientId);
            },
            envelopeFields = function (envelopeId, documentId) {
                window.location.href = routes.envelopeFieldsUrl(envelopeId, documentId);
            },
            envelopeDashboard = function() {
                window.location.href = routes.envelopeDashboardUrl();
            },
            contactDashboard = function() {
                window.location.href = routes.contactDashboardUrl();
            },
            signatureDashboard = function() {
                window.location.href = routes.signatureDashboardUrl();
            },
            templateDashboard = function() {
                window.location.href = routes.templateDashboardUrl();
            },
            formDashboard = function() {
                window.location.href = routes.formDashboardUrl();
            },
            formArchivedDashboard = function() {
                window.location.href = routes.formArchivedDashboardUrl();
            },
            envelopeArchivedDashboard = function() {
                window.location.href = routes.envelopeArchivedDashboardUrl();
            },
            templateView = function(templateId) {
                window.location.href = routes.templateViewUrl(templateId);
            },
            formView = function(formId) {
                window.location.href = routes.formViewUrl(formId);
            },
            downloadFormDocuments = function (userId, privateKey, formId) {
                window.location.href = routes.downloadFormDocumentsUrl(userId, privateKey, formId);
            },
            formSigned = function (formId, participantId) {
                window.location.href = routes.formSignedUrl(formId, participantId);
            },
            embedFormSigned = function (formId, participantId) {
                window.location.href = routes.embedFormSignedUrl(formId, participantId);
            },
            documentSign = function (documentId) {
                window.location.href = routes.documentSignUrl(documentId);
            },
            downloadFormParticipantDocuments = function (formId, participantId) {
                window.location.href = routes.publicDownloadFormDocumentsUrl(formId, participantId);
            };
        return {
            viewDocument: viewDocument,
            envelopeView: envelopeView,
            envelopeSigned: envelopeSigned,
            envelopeSign: envelopeSign,
            envelopeFields: envelopeFields,
            envelopeDashboard: envelopeDashboard,
            contactDashboard: contactDashboard,
            signatureDashboard: signatureDashboard,
            templateDashboard: templateDashboard,
            formDashboard: formDashboard,
            envelopeArchivedDashboard: envelopeArchivedDashboard,
            formArchivedDashboard: formArchivedDashboard,
            templateView: templateView,
            formView: formView,
            downloadFormDocuments: downloadFormDocuments,
            formSigned: formSigned,
            embedEnvelopeSigned: embedEnvelopeSigned,
            viewDocumentEmbed: viewDocumentEmbed,
            documentSign: documentSign,
            embedEnvelopeSign: embedEnvelopeSign,
            embedFormSigned: embedFormSigned,
            downloadFormParticipantDocuments: downloadFormParticipantDocuments
        };
    });
define('core/repository/baserepository',
    ['jquery', 'lib/underscore', 'ko', 'core/utils'],
    function ($, _, ko, utils) {
        var itemsToArray = function(items, observableArray) {
            if (!observableArray) return;
            var underlyingArray = utils.mapMemoToArray(items);
            observableArray(underlyingArray);
        },
            addItemsToArray = function (items, observableArray) {
                if (!observableArray) return;
                var currentItems = observableArray();
                var result = currentItems.concat(items);
                observableArray(result);
                //$.each(utils.mapMemoToArray(items), function(i) {
                //    observableArray.push(this);
                //});
            },
            baseRepository = function(target, getFunction, updateFunction) {
                var self = this;
                self.mapDtoListToContext = function(dtoList, results) {
                        var items1 = _.map(dtoList, function(dto) {
                            return target.fromDto(dto);
                        });
                        itemsToArray(items1, results);
                        return items1; // must return these
                    };
                self.addDtoListToContext = function (dtoList, results) {
                    var items1 = _.map(dtoList, function (dto) {
                        return target.fromDto(dto);
                    });
                    addItemsToArray(items1, results);
                    return items1; // must return these
                };
                self.getData = function (options) {
                    return $.Deferred(function(def) {
                        var results = options && options.results,
                            param = options && options.param,
                            getFunctionOverride = options && options.getFunctionOverride;

                        getFunction = getFunctionOverride || getFunction;


                        getFunction({
                            success: function(dtoList) {
                                mapDtoListToContext(dtoList, results);
                                def.resolve(results);
                            },
                            error: function(response) {
                                def.reject();
                            }
                        }, param);
                    }).promise();
                };
                self.updateData = function(entity, callbacks) {

                    var entityJson = ko.toJSON(entity);

                    return $.Deferred(function(def) {
                        if (!updateFunction) {
                            if (callbacks && callbacks.error) {
                                callbacks.error();
                            }
                            def.reject();
                            return;
                        }

                        updateFunction({
                            success: function(response) {
                                entity.dirtyFlag().reset();
                                if (callbacks && callbacks.success) {
                                    callbacks.success();
                                }
                                def.resolve(response);
                            },
                            error: function(response) {
                                if (callbacks && callbacks.error) {
                                    callbacks.error();
                                }
                                def.reject(response);
                                return;
                            }
                        }, entityJson);
                    }).promise();
                };
            };
        return baseRepository;
    });
define('core/repository',
    [
        'core/repository/repository.envelope',
        'core/repository/repository.envelope.resource',
        'core/repository/repository.envelope.document',
        'core/repository/repository.envelope.recipient',
        'core/repository/repository.contact',
        'core/repository/repository.template',
        'core/repository/repository.template.resource',
        'core/repository/repository.template.document',
        'core/repository/repository.signature',
        'core/repository/repository.form',
        'core/repository/repository.form.resource',
        'core/repository/repository.field',
        'core/repository/repository.envelope.field',
        'core/repository/repository.predefinedlist',
        'core/repository/repository.form.document',
        'core/repository/repository.form.field',
        'core/repository/repository.template.recipient',
        'core/repository/repository.template.field',
        'core/repository/repository.document',
        'core/repository/repository.resources',
        'core/repository/repository.form.participant'
    ],
    function (envelope,
        envelopeResource,
        envelopeDocument,
        envelopeRecipient,
        contact,
        template,
        templateResource,
        templateDocument,
        signature,
        form,
        formResource,
        field,
        envelopeField,
        predefinedList,
        formDocument,
        formField,
        templateRecipient,
        templateField,
        document,
        resources,
        formParticipant
    ) {
        return {
            envelope: envelope,
            envelopeResource: envelopeResource,
            envelopeDocument: envelopeDocument,
            envelopeRecipient: envelopeRecipient,
            contact: contact,
            template: template,
            templateResource: templateResource,
            templateDocument: templateDocument,
            signature: signature,
            form: form,
            formResource: formResource,
            field: field,
            envelopeField: envelopeField,
            predefinedList: predefinedList,
            formDocument: formDocument,
            formField: formField,
            templateRecipient: templateRecipient,
            templateField: templateField,
            document: document,
            resources: resources,
            formParticipant: formParticipant
        };
    });
define('core/repository/repository.contact',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.contact',
     'core/model/model.contact'
    ],
    function (baserepository, dataservice, model) {
        var contact = new baserepository(model);

        contact.getContacts = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function(def) {
                var itemsResult = options && options.itemsResult,
                   itemsCount = options && options.itemsCount,
                   param = options && options.param;

                dataservice.getContacts({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            if (itemsResult != null)
                                contact.addDtoListToContext(dtoList.result.contacts, itemsResult);
                            if (itemsCount != null)
                                itemsCount(dtoList.result.count);
                            def.resolve(dtoList);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        },
        contact.addContact = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.addContact({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok')
                            def.resolve(dtoList);
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        },
        contact.deleteContacts = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteContacts({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else
                            def.reject(result.error_message);
                    },
                    error: function (response) {
                        def.reject(respose);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        contact.updateContact = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.updateContact({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else
                            def.reject(result.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        contact.importContacts = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.importContacts({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else
                            def.reject(result.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
       

        return contact;
    });
define('core/repository/repository.document',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.document',
     'core/utils',
     'core/model/model.document.field'
    ],
    function (baserepository, dataservice, utils, modelField) {
        var document = new baserepository();
        var documentField = new baserepository(modelField);
        
        document.signDocument = function(options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;

            return $.Deferred(function(def) {
                var param = options && options.param;
                dataservice.publicSignDocument({
                    success: function(response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function(result) {
                        def.reject(result.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        document.getStatus = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.publicGetDocumentStatus({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        document.getFields = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                        param = options && options.param;
                dataservice.publicGetDocumentFields({
                    success: function (response) {
                        if (response.status == 'Ok') {
                            var result = documentField.addDtoListToContext(response.result.fields, ko.observableArray());
                            //if (itemsResult != null)
                            //    itemsResult(result);
                            def.resolve(result);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        document.getDocument = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.publicGetDocument({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        document.saveDocumentsFields = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;

            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.publicSaveDocumentFields({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (result) {
                        def.reject(result.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        document.getDefaultField = function () {
            return modelField.blank();
        };
        return document;
    });
define('core/repository/repository.envelope.document',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.envelope.document',
     'core/model/model.envelope.document',
     'core/config'
    ],
    function (baserepository, dataservice, model,config) {
        var envelopeDocument = new baserepository(model);
        var userCredentials = { userId: config.userId() ? config.userId() : '', privateKey: config.privateKey() ? config.privateKey() : '' };
        //Add here the envelope resources repository custom methods

        envelopeDocument.addDocument = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var documentResult = options && options.documentResult,
                    param = options && options.param;

                dataservice.addDocument({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var result = model.fromDto(dtoList.result.document);
                            if (documentResult != null) documentResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        
        envelopeDocument.getDocuments = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options && options.isPublic;
            var documentResult = options && options.documentResult,
                param = options && options.param;

            if (!isPublic) {
                return $.Deferred(function(def) {
                    dataservice.getDocuments({
                        success: function (dtoList) {
                            if (dtoList.status == 'Ok') {
                                envelopeDocument.addDtoListToContext(dtoList.result.documents, documentResult);
                                def.resolve(documentResult);
                            }
                            else
                                def.reject(dtoList.error_message);
                        },
                        error: function(response) {
                            def.reject(response);
                        }
                    }, param);
                }).promise().done(doneCallback).fail(errorCallback);
            } else {
                return $.Deferred(function (def) {
                    dataservice.publicGetDocuments({
                        success: function (dtoList) {
                            if (dtoList.status == 'Ok') {
                                envelopeDocument.addDtoListToContext(dtoList.result.documents, documentResult);
                                def.resolve(documentResult);
                            }
                            else
                                def.reject(dtoList.error_message);
                        },
                        error: function (response) {
                            def.reject(response);
                        }
                    }, param);
                }).promise().done(doneCallback);

            }
        };
        envelopeDocument.removeDocument = function(options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function(def) {
                var param = options && options.param;

                dataservice.removeDocument({
                    success: function(dtoList) {
                        if (dtoList.status == 'Ok') {
                            def.resolve();
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelopeDocument.renameDocument = function (envelopeId, documentId, newName, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    envelopeId: envelopeId,
                    documentId: documentId,
                    newName: newName
                }, userCredentials);
                dataservice.renameDocument({
                    success: function (result) {
                        if (result.status == "Ok") {
                            def.resolve(result);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        return envelopeDocument;
    });
define("core/repository/repository.envelope.field",
    ["core/repository/baserepository",
     "core/dataservice/dataservice.envelope.field",
     "core/model/model.envelope.field"
    ],
    function (baserepository, dataservice, modelField) {
        var envelopeField = new baserepository(modelField);

        envelopeField.getFields = function(options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options && options.isPublic;

            function getFieldsList(def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.getFields({
                    success: function(dto) {
                        if (dto.status === "Ok") {
                            var result = envelopeField.addDtoListToContext(dto.result.fields, itemsResult);
                            if (itemsResult != null)
                                itemsResult(result);
                            def.resolve(result);
                        } else
                            def.reject(dto.error_message);
                    },
                    error: function(dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }

            function publicGetFieldsList(def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.publicGetFields({
                    success: function(dto) {
                        if (dto.status === "Ok") {
                            var result = envelopeField.addDtoListToContext(dto.result.fields, itemsResult);
                            if (itemsResult != null)
                                itemsResult(result);
                            def.resolve(result);
                        } else
                            def.reject(dto.error_message);
                    },
                    error: function(dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }

            return $.Deferred(isPublic ? publicGetFieldsList : getFieldsList).done(successCallback).fail(errorCallback);
        };

        envelopeField.getField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.getFields({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.fields[0]);
                            def.resolve(result);
                        } else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };
        envelopeField.addField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.addField({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.deleteFieldLocation = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteFieldLocation({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            def.resolve();
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.updateFieldLocation = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options.isPublic || false;

            function updateFieldLoc(def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.updateFieldLocation({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }

            function publicUpdateFieldLoc(def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.publicUpdateFieldLocation({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }


            return $.Deferred(isPublic?publicUpdateFieldLoc:updateFieldLoc).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.updateField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.updateField({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.deleteFields = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteFields({
                    success: function (dto) {
                        def.resolve();
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.fillField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options && options.isPublic;
            if (!isPublic) {
                return $.Deferred(function(def) {
                    var fieldResult = options && options.fieldResult,
                        param = options && options.param;
                    dataservice.fillField({
                        success: function(dto) {
                            if (dto.status === "Ok") {
                                var result = modelField.fromDto(dto.result.field);
                                if (fieldResult != null) fieldResult = result;
                                def.resolve(result);
                            } else
                                def.reject(dto.error_message);
                        },
                        error: function(dto) {
                            if (dto != null)
                                def.reject(dto.error_message);
                            else
                                def.reject('Error when updating field');
                        }
                    }, param);
                }).promise().done(successCallback).fail(errorCallback);
            } else {
                return $.Deferred(function (def) {
                    var fieldResult = options && options.fieldResult,
                        param = options && options.param;
                    dataservice.publicFillField({
                        success: function (dto) {
                            if (dto.status === "Ok") {
                                var result = modelField.fromDto(dto.result.field);
                                if (fieldResult != null) fieldResult = result;
                                def.resolve(result);
                            } else
                                def.reject(dto.error_message);
                        },
                        error: function (dto) {
                            if (dto != null)
                                def.reject(dto.error_message);
                            else 
                                def.reject('Error when updating field');
                        }
                    }, param);
                }).promise().done(successCallback).fail(errorCallback);
            }
        };
        envelopeField.assignField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.assignField({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeField.updateFieldLocationOrder = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.updateFieldLocationOrder({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };

        return envelopeField;
    });
define('core/repository/repository.envelope',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.envelope',
     'core/model/model.envelope',
     'core/utils',
     'core/model/model.auditlog',
     'core/config'
    ],
    function (baserepository, dataservice, model, utils, modelAuditLog,config) {
        var envelope = new baserepository(model, dataservice.getEnvelopes);
        var auditLog = new baserepository(modelAuditLog, dataservice.getEnvelopeAuditLog);
        var userCredentials = { userId: config.userId() ? config.userId() : '', privateKey: config.privateKey() ? config.privateKey() : '' };
        //Add here the envelope repository custom methods

        envelope.getEnvelopes = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;

                dataservice.getEnvelopes({
                    success: function (response) {
                        if (response.status == "Ok") {
                            envelope.addDtoListToContext(response.result.envelopes, itemsResult);
                            itemsCount(response.result.envelopesCount);
                            def.resolve(itemsResult, itemsCount);
                        } else
                            def.reject(response.error_message);

                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        },
        envelope.envelopeRecipientSigned = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function(def) {
                var param = options && options.param;
                dataservice.envelopeRecipientSigned({
                    success: function (response) {                 
                            def.resolve(response);            
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        },
        envelope.getEnvelopeCurrentRecipientId = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function(def) {
                var param = options && options.param;
                dataservice.getEnvelopeCurrentRecipientId({
                    success: function (response) {
                        def.resolve(response);
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.restartEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.restartEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.archiveEnvelopes = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.archiveEnvelopes({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.createEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.createEnvelope({
                    success: function (response) {
                        if (response.status == "Ok")
                            def.resolve(response.result);
                        else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.getEnvelope = function(options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options && options.isPublic;
            if (!isPublic) {
                return $.Deferred(function(def) {
                    var itemsResult = options && options.itemsResult,
                        param = options && options.param;
                    dataservice.getEnvelope({
                        success: function(response) {
                            if (response.status == "Ok") {
                                itemsResult(model.fromDto(response.result.envelope));
                                def.resolve(itemsResult);
                            } else
                                def.reject(response.error_message);
                        },
                        error: function(response) {
                            def.reject(response);
                        }
                    }, param);
                }).promise().done(doneCallback).fail(errorCallback);
            } else {
                return $.Deferred(function (def) {
                    var itemsResult = options && options.itemsResult,
                        param = options && options.param;
                    dataservice.publicGetEnvelope({
                        success: function (response) {
                            if (response.status == "Ok") {
                                itemsResult(model.fromDto(response.result.envelope));
                                def.resolve(itemsResult);
                            } else
                                def.reject(response.error_message);
                        },
                        error: function (response) {
                            def.reject(response);
                        }
                    }, param);
                }).promise().done(doneCallback).fail(errorCallback);

            }
        };
        envelope.updateEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.updateEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            var result = model.fromDto(response.result.envelope);
                            if (itemsResult != null)
                                itemsResult(result);
                            def.resolve(result);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.renameEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.renameEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            if (itemsResult != null)
                                itemsResult(model.fromDto(response.result.envelope));
                            def.resolve(itemsResult);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.sendEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.sendEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.deleteEnvelopes = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteEnvelopes({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.getEnvelopeAuditLog = function(options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function(def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.getEnvelopeAuditLog({
                    success: function (response) {
                        if (response.status == "Ok") {
                            auditLog.addDtoListToContext(response.result.logs, itemsResult);
                            def.resolve(itemsResult);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.signEnvelope = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options && options.isPublic;
            if (!isPublic) {
                return $.Deferred(function(def) {
                    var param = options && options.param;
                    dataservice.signEnvelope({
                        success: function(result) {
                            if (result.status == 'Ok') {
                                def.resolve(result);
                            } else
                                def.reject(result.error_message);
                        },
                        error: function(result) {
                            def.reject(result.error_message);
                        }
                    }, param);
                }).promise().done(successCallback).fail(errorCallback);
            } else {
                return $.Deferred(function (def) {
                    var param = options && options.param;
                    dataservice.publicSignEnvelope({
                        success: function (result) {
                            if (result.status == 'Ok') {
                                def.resolve(result);
                            } else
                                def.reject(result.error_message);
                        },
                        error: function (result) {
                            def.reject(result.error_message);
                        }
                    }, param);
                }).promise().done(successCallback).fail(errorCallback);
            }
        };
        envelope.getStatus = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.publicEnvelopeStatus({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.cancelEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.cancelEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.retrySignEnvelope = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.retrySignEnvelope({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        envelope.updateEnvelopeFromTemplate = function (envelopeId, templateId, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    envelopeId: envelopeId,
                    templateId: templateId
                }, userCredentials);
                dataservice.updateEnvelopeFromTemplate({
                    success: function (result) {
                        if (result.status == "Ok") {
                            def.resolve(result);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        envelope.resendEmailNotification = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.resendEmailNotification({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(response);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        return envelope;
    });
define('core/repository/repository.envelope.recipient',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.envelope.recipient',
     'core/model/model.envelope.recipient'
    ],
    function (baserepository, dataservice, model) {
        var envelopeRecipient = new baserepository(model);
        
        envelopeRecipient.addRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var recipientResult = options && options.recipientResult,
                    param = options && options.param;
                dataservice.addRecipient({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.recipient);
                            if (recipientResult != null) recipientResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeRecipient.removeRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.removeRecipient({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok')
                            def.resolve();
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        envelopeRecipient.updateRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var recipientResult = options && options.recipientResult,
                    param = options && options.param;
                dataservice.updateRecipient({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.recipient);
                            if (recipientResult != null) recipientResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        return envelopeRecipient;
    });
define('core/repository/repository.envelope.resource',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.envelope',
     'core/model/model.envelope.resource'
    ],
    function (baserepository, dataservice, model) {
        var envelopesResource = new baserepository(model, dataservice.getEnvelopesResources);
        //Add here the envelope resources repository custom methods

        envelopesResource.getResources = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var resourcesResult = options && options.resourcesResult,                    
                    param = options && options.param;

                dataservice.getEnvelopesResources({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            resourcesResult(model.fromDto(dtoList.result));
                            def.resolve(resourcesResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };

        return envelopesResource;
    });
define("core/repository/repository.field",
    ["core/repository/baserepository",
     "core/dataservice/dataservice.field",
     "core/model/model.field"
    ],
    function (baserepository, dataservice, model) {
        var field = new baserepository(model, dataservice.getFields);

        field.getFields = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            var isPublic = options.isPublic || false;

            function getFieldsList(def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;
                dataservice.getFields({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            if (itemsResult!=null)
                                field.addDtoListToContext(dto.result.fields, itemsResult);
                            if (itemsCount!=null)
                                itemsCount(dto.result.count);
                            def.resolve(itemsResult, itemsCount);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }

            function publicGetFieldsList(def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;
                dataservice.publicGetFields({
                    success: function (dto) {
                        if (dto.status === "Ok") {
                            if (itemsResult != null)
                                field.addDtoListToContext(dto.result.fields, itemsResult);
                            if (itemsCount != null)
                                itemsCount(dto.result.count);
                            def.resolve(itemsResult, itemsCount);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }

            var def = $.Deferred(isPublic ? publicGetFieldsList : getFieldsList).promise()
                                  .done(doneCallback)
                                  .fail(errorCallback);

            return def;
        };

        return field;
    });
define('core/repository/repository.form.document',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.form.document',
     'core/model/model.form.document',
     'core/config'
    ],
    function (baserepository, dataservice, model,config) {
        var formDocument = new baserepository(model);
        var userCredentials = { userId: config.userId()?config.userId():'', privateKey: config.privateKey()?config.privateKey():'' };
        
        formDocument.addDocument = function (formId, documentId, order, parseFields, doneCallback, failCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId,
                    documentId: documentId,
                    order: order,
                    parseFields: parseFields || false
                }, userCredentials);

                dataservice.addDocument({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                        var result = model.fromDto(dtoList.result.document);
                        def.resolve(result);
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        

        formDocument.getDocuments = function (formId, doneCallback, failCallback) {
       
            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId
                }, userCredentials);
                
                dataservice.getDocuments({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var documentResult = _.map(dtoList.result.documents, function (dto) { return model.fromDto(dto); });
                            def.resolve(documentResult);
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        formDocument.removeDocument = function (formId, documentId, doneCallback, failCallback) {
            return $.Deferred(function(def) {
                var param = $.extend({
                    formId: formId,
                    documentId: documentId
                }, userCredentials);

                dataservice.removeDocument({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            def.resolve();
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function(response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        formDocument.publicGetDocuments = function (formId, doneCallback, failCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId
                }, userCredentials);

                dataservice.publicGetDocuments({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var documentResult = _.map(dtoList.result.documents, function (dto) { return model.fromDto(dto); });
                            def.resolve(documentResult);
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        formDocument.renameDocument = function (formId, documentId, newName, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId,
                    documentId: documentId,
                    newName: newName
                }, userCredentials);
                dataservice.renameDocument({
                    success: function (result) {
                        if (result.status == "Ok") {
                            def.resolve(result);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        formDocument.modifyDocument = function (formId, documentId, newDocumentGuid, order, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId,
                    documentId: documentId,
                    newDocumentGuid: newDocumentGuid,
                    order:order
                }, userCredentials);
                dataservice.modifyDocument({
                    success: function (response) {
                        if (response.status == "Ok") {
                            def.resolve(model.fromDto(response.result.document));
                        } else {
                            def.reject(response.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        return formDocument;
    });
define('core/repository/repository.form.field',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.form.field',
     'core/model/model.form.field',
     'core/config'
    ],
    function (baserepository, dataservice, modelField,config) {
        var formField = new baserepository(modelField);
        var userCredentials = { userId: config.userId() ? config.userId() : '', privateKey: config.privateKey() ? config.privateKey() : '' };
        
        formField.getFields = function (documentId, formId, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    formId:formId
                }, userCredentials);

                dataservice.getFields({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var fieldsResult = _.map(dtoList.result.fields, function (dto) { return modelField.fromDto(dto); });
                            def.resolve(fieldsResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };
        formField.getField = function (documentId, formId, fieldId, successCallback, errorCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    formId: formId,
                    fieldId: fieldId
                }, userCredentials);

                dataservice.getFields({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var result = modelField.fromDto(dtoList.result.fields[0]);
                            def.resolve(result);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };

        formField.addField = function (documentId, fieldId, forceNewField, formId, locationHeight, locationWidth, locationX, locationY, name, page, pageWidth, pageHeight, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    fieldId: fieldId,
                    forceNewField: forceNewField,
                    formId: formId,
                    locationHeight: locationHeight,
                    locationWidth: locationWidth,
                    locationX: locationX,
                    locationY:locationY,
                    name: name,
                    page: page,
                    pageWidth: pageWidth,
                    pageHeight: pageHeight
                }, userCredentials);
                
                dataservice.addField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        formField.deleteFieldLocation = function (fieldId, formId, locationId, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    fieldId: fieldId,
                    formId: formId,
                    locationId: locationId
                }, userCredentials);

                dataservice.deleteFieldLocation({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            def.resolve();
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        formField.updateFieldLocation = function (documentId, fieldId, formId, locationHeight, locationId, locationWidth, locationX, locationY, page,
                                                    fontBold, fontColor, fontItalic,  fontName, fontSize, fontUnderline, align, pageWidth,pageHeight, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    fieldId: fieldId,
                    formId: formId,
                    locationHeight: locationHeight,
                    locationId: locationId,
                    locationWidth: locationWidth,
                    locationX: locationX,
                    locationY: locationY,
                    page: page,
                    fontBold: fontBold,
                    fontColor: fontColor,
                    fontItalic: fontItalic,
                    fontName: fontName,
                    fontSize: fontSize,
                    fontUnderline: fontUnderline,
                    align: align,
                    pageWidth: pageWidth,
                    pageHeight: pageHeight
                    
                }, userCredentials);
                dataservice.updateFieldLocation({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        
        formField.updateField = function (documentId, fieldId, formId, acceptableValues, defaultValue, mandatory, name, order, regularExpression, tooltip, guidanceText,groupName, fieldType, settings, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    fieldId: fieldId,
                    formId: formId,
                    acceptableValues:acceptableValues,
                    defaultValue: defaultValue,
                    mandatory: mandatory,
                    name: name,
                    order: order,
                    regularExpression: regularExpression,
                    tooltip: tooltip,
                    guidanceText: guidanceText,
                    groupName: groupName,
                    fieldType: fieldType,
                    settings: settings
                }, userCredentials);

                dataservice.updateField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        
        formField.deleteFields = function (formId, fieldIds, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId,
                    fieldIds: fieldIds
                }, userCredentials);

                dataservice.deleteFields({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            def.resolve();
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        
        formField.publicGetFields = function (documentId, formId,participantId, successCallback, errorCallback) {

            return $.Deferred(function (def) {
                var param = $.extend({
                    documentId: documentId,
                    formId: formId,
                    participantId: participantId
                }, userCredentials);

                dataservice.publicGetFields({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var fieldsResult = _.map(dtoList.result.fields, function (dto) { return modelField.fromDto(dto); });
                            def.resolve(fieldsResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };
        
        formField.publicFillField = function (data, documentId, fieldId, formId, participantId, successCallback, errorCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    data: data,
                    documentId:documentId,
                    fieldId: fieldId,
                    formId: formId,
                    participantId: participantId
                }, userCredentials);

                dataservice.publicFillField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            def.resolve(dto.result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        
        return formField;
    });
define('core/repository/repository.form',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.form',
     'core/model/model.form',
     'core/config',
     'core/model/model.auditlog'
    ],
    function (baserepository, dataservice, model,config, modelAuditLog) {
        var form = new baserepository(model);
        var userCredentials = { userId: config.userId() ? config.userId() : '', privateKey: config.privateKey() ? config.privateKey() : '' };
        var auditLog = new baserepository(modelAuditLog, dataservice.getEnvelopeAuditLog);

        form.getForms = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;

                dataservice.getForms({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            form.addDtoListToContext(dtoList.result.forms, itemsResult);
                            itemsCount(dtoList.result.count);
                            def.resolve(itemsResult, itemsCount);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        form.getForm = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemResult = options && options.itemResult,
                    param = options && options.param;

                dataservice.getForm({
                    success: function (dto) {
                    if (dto.status == 'Ok') {
                        var result = model.fromDto(dto.result.form);
                        if (itemResult != null) itemResult(result);
                        def.resolve(result);
                    }
                    else
                        def.reject(dto.error_message);
                },
                error: function (dto) {
                    def.reject(dto.error_message);
                }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        form.createForm = function (doneCallback, failCallback, name, templateId, waterMarkImage, waterMarkText, canParticipantDownloadForm, formId, notifyOwnerOnSign, attachSignedDocument, canParticipantPrintForm) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    templateId: templateId? templateId:"",
                    canParticipantDownloadForm: canParticipantDownloadForm ? canParticipantDownloadForm : false,
                    canParticipantPrintForm: canParticipantPrintForm ? canParticipantPrintForm : true,
                    waterMarkText: waterMarkText? waterMarkText: "",
                    waterMarkImage: waterMarkImage? waterMarkImage:"",
                    name: name ? name : "New form",
                    formId: formId? formId:"",
                    notifyOwnerOnSign: notifyOwnerOnSign ? notifyOwnerOnSign : false,
                    attachSignedDocument: attachSignedDocument ? attachSignedDocument : false,
                    canBeCommented: false,
                    showParticipantCommentInSignedDocument: true
                }, userCredentials);
                dataservice.createForm({
                    success: function (dto) {
                        if (dto.status == 'Ok')
                            def.resolve(dto.result);
                        else {
                            def.reject(dto.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        form.deleteForms = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteForms({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        form.completeForm = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.completeForm({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        form.archiveForm = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.archiveForm({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        
        form.updateFormFromTemplate = function ( formId, templateId, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    formId: formId,
                    templateId: templateId
                },userCredentials);
                dataservice.updateFormFromTemplate({
                    success: function (result) {
                        if (result.status == "Ok") {
                            def.resolve(result);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        form.modifyForm = function (formId, name, fieldsInFinalFileName, canParticipantDownloadForm, waterMarkText, waterMarkImage,
                notifyOwnerOnSign, attachSignedDocument, notifyOtherOnSign, canParticipantPrintForm, requireUserAuthForSign, requestUserAuthByPhoto, 
                enableTypedSignature, enableUploadedSignature, requireUserIdentityValidation, canBeCommented, showParticipantCommentInSignedDocument,
                tags,
            doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = $.extend({
                    formId: formId,
                    name: name,
                    fieldsInFinalFileName: fieldsInFinalFileName,
                    canParticipantDownloadForm: canParticipantDownloadForm,
                    canParticipantPrintForm: canParticipantPrintForm,
                    waterMarkText: waterMarkText,
                    waterMarkImage: waterMarkImage,
                    notifyOwnerOnSign: notifyOwnerOnSign ? notifyOwnerOnSign : false,
                    attachSignedDocument: attachSignedDocument ? attachSignedDocument : false,
                    notifyOtherOnSign: notifyOtherOnSign,
                    requireUserAuthForSign: requireUserAuthForSign,
                    requestUserAuthByPhoto: requestUserAuthByPhoto,
                    enableTypedSignature: enableTypedSignature,
                    enableUploadedSignature: enableUploadedSignature,
                    requireUserIdentityValidation: requireUserIdentityValidation,
                    canBeCommented: canBeCommented,
                    showParticipantCommentInSignedDocument: showParticipantCommentInSignedDocument,
                    tags: tags

                }, userCredentials);
                
                dataservice.modifyForm({
                    success: function (result) {
                        if (result.status=='Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        form.publishForm = function (formId, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = $.extend({
                    formId: formId
                }, userCredentials);

                dataservice.publishForm({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        form.archiveForms = function (formIds, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = $.extend({
                    formIds: formIds
                }, userCredentials);

                dataservice.archiveForms({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        form.publicSignForm = function (formId,participantId, participantName, authData, comment, email, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = $.extend({
                    formId: formId,
                    participantId: participantId,
                    participantName: participantName,
                    authData: authData == null ? "" : authData,
                    comment: comment,
                    email:email
                }, userCredentials);

                dataservice.publicSignForm({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        form.publicGetFormParticipant = function (formId, participantId, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = $.extend({
                    formId: formId,
                    participantId: participantId
                }, userCredentials);

                dataservice.publicGetFormParticipant({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result.result.participant);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        
        form.getFormAuditLog = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.getFormAuditLog({
                    success: function (response) {
                        if (response.status == "Ok") {
                            auditLog.addDtoListToContext(response.result.logs, itemsResult);
                            def.resolve(itemsResult);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        form.publicModifyFormParticipant = function (formId, participantId, email, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param ={
                    formId: formId,
                    participantId: participantId,
                    email:email
                };

                dataservice.publicModifyFormParticipant({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result.result.participant);
                        else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        form.publicValidateFormParticipant = function (formId, participantId, code, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param = {
                    formId: formId,
                    participantId: participantId,
                    code: code
                };

                dataservice.publicValidateFormParticipant({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(true);
                        else {
                            def.resolve(false);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        form.publicFormParticipantResentValidationCode = function (formId, participantId, doneCallback, failCallback) {
            return $.Deferred(function (def) {

                var param ={
                    formId: formId,
                    participantId: participantId
                };

                dataservice.publicFormParticipantResentValidationCode({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(true);
                        else {
                            def.resolve(false);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        return form;
    });
define('core/repository/repository.form.participant',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.form.participant',
     'core/model/model.form.participant'
    ],
    function (baserepository, dataservice, model) {
        var formParticipant = new baserepository(model);
        formParticipant.getFormParticipants = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.getFormParticipants({
                    success: function (result) {
                        if (result.status == 'Ok') {
                            var itemResult = ko.observableArray([]);
                            formParticipant.addDtoListToContext(result.result.participants, itemResult);
                            def.resolve(itemResult);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };

        return formParticipant;
    });
define('core/repository/repository.form.resource',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.form',
     'core/model/model.form.resource'
    ],
    function (baserepository, dataservice, model) {
        var formsResource = new baserepository(model, dataservice.getFormsResources);
        // is used ? 
        formsResource.getResources = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var resourcesResult = options && options.resourcesResult,
                    param = options && options.param;

                dataservice.getFormsResources({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            resourcesResult(model.fromDto(dtoList.result));
                            def.resolve(resourcesResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };

        return formsResource;
    });
define('core/repository/repository.predefinedlist',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.predefinedlist',
     'core/model/model.predefinedlist'
    ],
    function (baserepository, dataservice, model) {
        var predefinedList = new baserepository(model, dataservice.getPredefinedLists);

        predefinedList.getPredefinedLists = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;

                dataservice.getPredefinedLists({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            predefinedList.addDtoListToContext(dtoList.result.lists, itemsResult);
                            def.resolve(itemsResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        predefinedList.addList = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.addList({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.list);
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        
        predefinedList.deleteList = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;

                dataservice.deleteList({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            predefinedList.addDtoListToContext(dtoList.result.lists, itemsResult);
                            def.resolve(itemsResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        return predefinedList;
    });
define('core/repository/repository.resources',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.resources'
    ],
    function (baserepository, dataservice) {
        var repository = new baserepository();

        repository.getSignatureBackgroundSvg = function () {
            return $.Deferred(function(def) {
                dataservice.getSignatureBackgroundSvg({
                    success: function(data) {
                        def.resolve(data);
                    },
                    error: function() {
                        def.reject();
                    }
                });
            }).promise();
        };

        repository.getStampBackgroundSvg = function () {
            return $.Deferred(function (def) {
                dataservice.getStampBackgroundSvg({
                    success: function (data) {
                        def.resolve(data);
                    },
                    error: function () {
                        def.reject();
                    }
                });
            }).promise();
        };
        return repository;
    });
define('core/repository/repository.signature',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.signature',
     'core/model/model.signature',
     'core/utils'
    ],
    function (baserepository, dataservice, model, utils) {
        var signature = new baserepository(model, dataservice.getSignatures);

        signature.getSignatures = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;
                dataservice.getSignatures({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            signature.addDtoListToContext(dtoList.result.signatures, itemsResult);
                            itemsCount(dtoList.result.count);
                            def.resolve(itemsResult, itemsCount);
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        signature.deleteSignatures = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteSignatures({
                    success: function (result) {
                        if (result.status == 'Ok')
                            def.resolve(result);
                        else
                            def.reject(result.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        signature.getBlank = function () {
            return model.blank();
        };
        signature.createSignature = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;            
            return $.Deferred(function (def) {
                var param = options && options.param,
                    signatureResult = options && options.signatureResult;
                dataservice.createSignature({
                    
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.signature);
                            if (signatureResult != null) signatureResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        signature.updateSignature = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;            
            return $.Deferred(function (def) {
                var param = options && options.param,
                    signatureResult = options && options.signatureResult;
                dataservice.updateSignature({
                    
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.signature);
                            if (signatureResult != null) signatureResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        return signature;
    });
define('core/repository/repository.template.document',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.template.document',
     'core/model/model.template.document',
     'core/config'
    ],
    function (baserepository, dataservice, model, config) {
        var templateDocument = new baserepository(model);
        var userCredentials = { userId: config.userId() ? config.userId() : '', privateKey: config.privateKey() ? config.privateKey() : '' };
        templateDocument.addDocument = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var documentResult = options && options.documentResult,
                    param = options && options.param;

                dataservice.addDocument({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            var result = model.fromDto(dtoList.result.document);
                            if (documentResult != null) documentResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        templateDocument.getDocuments = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var documentResult = options && options.documentResult,
                    param = options && options.param;

                dataservice.getDocuments({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            templateDocument.addDtoListToContext(dtoList.result.documents, documentResult);
                            def.resolve(documentResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        templateDocument.removeDocument = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;

                dataservice.removeDocument({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok')
                            def.resolve();
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        templateDocument.renameDocument = function (templateId, documentId, newName, doneCallback, failCallback) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    templateId: templateId,
                    documentId: documentId,
                    newName: newName
                }, userCredentials);
                dataservice.renameDocument({
                    success: function (result) {
                        if (result.status == "Ok") {
                            def.resolve(result);
                        } else {
                            def.reject(result.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        return templateDocument;
    });
define('core/repository/repository.template.field',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.template.field',
     'core/model/model.template.field'
    ],
    function (baserepository, dataservice, modelField) {
        var templateField = new baserepository(modelField);

        templateField.getFields = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.getFields({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = templateField.addDtoListToContext(dto.result.fields, itemsResult);
                            if (itemsResult != null)
                                itemsResult(result);
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };
        templateField.getField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.getFields({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.fields[0]);
                            def.resolve(result);
                        } else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).done(successCallback).fail(errorCallback);
        };
        templateField.addField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.addField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.deleteFieldLocation = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteFieldLocation({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            def.resolve();
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.updateFieldLocation = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.updateFieldLocation({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.updateField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.updateField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.deleteFields = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteFields({
                    success: function (dto) {
                        def.resolve();
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.fillField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.fillField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateField.assignField = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var fieldResult = options && options.fieldResult,
                    param = options && options.param;
                dataservice.assignField({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = modelField.fromDto(dto.result.field);
                            if (fieldResult != null) fieldResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        return templateField;
    });
define('core/repository/repository.template',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.template',
     'core/model/model.template',
     'core/config'
    ],
    function (baserepository, dataservice, model, config) {
        var template = new baserepository(model, dataservice.getTemplates);
        var userCredentials = { userId: config.userId(), privateKey: config.privateKey() };
        
       /* template.getTemplates = function (options) {
            var doneCallback = options && options.doneCallback;
            return $.Deferred(function(def) {
                var itemsResult = options && options.itemsResult,
                    itemsCount = options && options.itemsCount,
                    param = options && options.param;
                dataservice.getTemplates({
                    success: function(dtoList) {
                        template.addDtoListToContext(dtoList.result.templates, itemsResult);
                        if (itemsCount)
                            itemsCount(dtoList.result.templatesCount);
                        def.resolve(itemsResult, itemsCount);
                    },
                    error: function(response) {
                        def.reject();
                    }
                }, param);
            }).promise().done(doneCallback);
        };*/
        template.getTemplates = function (doneCallback, failCallback,page, count, documentGuid, recipientName, name, tag) {
            return $.Deferred(function (def) {
                var param = $.extend({
                    page: page ? page : 1,
                    count: count ? count : 2147483647,
                    documentGuid: documentGuid ? documentGuid : '',
                    recipientName: recipientName ? recipientName : '',
                    name: name ? name : '',
                    tag: tag ? tag : ''

                }, userCredentials);
                dataservice.getTemplates({
                    success: function (dtoList) {
                        if (dtoList.status == "Ok") {
                            var templates = _.map(dtoList.result.templates, function (dto) { return model.fromDto(dto); });
                            def.resolve(templates, dtoList.result.templatesCount);
                        } else {
                            def.reject(dtoList.error_message);
                        }
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(failCallback);
        };
        template.deleteTemplates = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.deleteTemplates({
                    success: function (result) {
                        if (result.status == 'Ok') 
                            def.resolve(result);
                        else
                            def.reject(status.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        template.createTemplate = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.createTemplate({
                    success: function (response) {
                        if (response.status == 'Ok')
                            def.resolve(response.result);
                        else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        template.getTemplate = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;

                dataservice.getTemplate({
                    success: function (response) {
                        if (response.status == "Ok") {
                            itemsResult(model.fromDto(response.result.template));
                            def.resolve(itemsResult);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        template.updateTemplate = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.updateTemplate({
                    success: function (response) {
                        if (response.status == "Ok") {
                            var result = model.fromDto(response.result.template);
                            if (itemsResult != null)
                                itemsResult(result);
                            def.resolve(result);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        template.renameTemplate = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var itemsResult = options && options.itemsResult,
                    param = options && options.param;
                dataservice.renameTemplate({
                    success: function (response) {
                        if (response.status == "Ok") {
                            if (itemsResult != null)
                                itemsResult(model.fromDto(response.result.template));
                            def.resolve(itemsResult);
                        } else
                            def.reject(response.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };
        return template;
    });
define('core/repository/repository.template.recipient',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.template.recipient',
     'core/model/model.template.recipient'
    ],
    function (baserepository, dataservice, model) {
        var templateRecipient = new baserepository(model);

        templateRecipient.addRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var recipientResult = options && options.recipientResult,
                    param = options && options.param;
                dataservice.addRecipient({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.recipient);
                            if (recipientResult != null) recipientResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateRecipient.removeRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var param = options && options.param;
                dataservice.removeRecipient({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok')
                            def.resolve();
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        templateRecipient.updateRecipient = function (options) {
            var successCallback = options && options.successCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var recipientResult = options && options.recipientResult,
                    param = options && options.param;
                dataservice.updateRecipient({
                    success: function (dto) {
                        if (dto.status == 'Ok') {
                            var result = model.fromDto(dto.result.recipient);
                            if (recipientResult != null) recipientResult = result;
                            def.resolve(result);
                        }
                        else
                            def.reject(dto.error_message);
                    },
                    error: function (dto) {
                        def.reject(dto.error_message);
                    }
                }, param);
            }).promise().done(successCallback).fail(errorCallback);
        };
        return templateRecipient;
    });
define('core/repository/repository.template.resource',
    ['core/repository/baserepository',
     'core/dataservice/dataservice.template',
     'core/model/model.template.resource'
    ],
    function (baserepository, dataservice, model) {
        var templatesResource = new baserepository(model, dataservice.getTemplatesResources);

        templatesResource.getResources = function (options) {
            var doneCallback = options && options.doneCallback;
            var errorCallback = options && options.errorCallback;
            return $.Deferred(function (def) {
                var resourcesResult = options && options.resourcesResult,
                    param = options && options.param;

                dataservice.getTemplatesResources({
                    success: function (dtoList) {
                        if (dtoList.status == 'Ok') {
                            resourcesResult(model.fromDto(dtoList.result));
                            def.resolve(resourcesResult);
                        }
                        else
                            def.reject(dtoList.error_message);
                    },
                    error: function (response) {
                        def.reject(response);
                    }
                }, param);
            }).promise().done(doneCallback).fail(errorCallback);
        };

        return templatesResource;
    });
define('core/routes',
    [
        'jquery'
    ],
    function($) {
        var prepareUrl = function(url) {
            var s = $(location).attr('protocol') + "//" + $(location).attr('hostname');
            var port = $(location).attr('port');
            if (port != "" && port != '8000') {
                s += ":" + port;
            }
            s += url;
            return s;
        },
            viewDocument = function(documentId) {
                return prepareUrl('/document-viewer/' + documentId);
            },
            viewDocumentEmbedUrl = function(documentId) {
                return prepareUrl('/document-viewer/embed/' + documentId);
            },
            envelopeView = function(envelopeId) {
                return prepareUrl('/signature2/prepare/' + envelopeId);
            },
            envelopeSigned = function(envelopeId) {
                return prepareUrl('/signature2/signed/' + envelopeId);
            },
            embedEnvelopeSigned = function(envelopeId, recipientId) {
                return prepareUrl('/signature2/signedembed/' + envelopeId + '/' + recipientId);
            },
            envelopeSign = function(envelopeId) {
                return prepareUrl('/signature2/sign/' + envelopeId);
            },
            envelopeFields = function(envelopeId, documentId) {
                return prepareUrl('/signature2/fields/' + envelopeId + "#" + documentId);
            },
            envelopeDashboard = function() {
                return prepareUrl('/signature2');
            },
            contactDashboard = function() {
                return prepareUrl('/signature2/contacts');
            },
            signatureDashboard = function() {
                return prepareUrl('/signature2/signatures');
            },
            templateDashboard = function() {
                return prepareUrl('/signature2/templates');
            },
            formDashboard = function() {
                return prepareUrl('/signature2/forms');
            },
            formArchivedDashboard = function() {
                return prepareUrl('/signature2/forms/archived');
            },
            envelopeArchivedDashboard = function() {
                return prepareUrl('/signature2/archived');
            },
            templateView = function(templateId) {
                return prepareUrl('/signature2/templates/prepare/' + templateId);
            },
            embedSignEnvelopeUrl = function(envelopeId, recipientId) {
                return prepareUrl('/signature2/signembed/' + envelopeId + '/' + recipientId);
            },
            embedSignFormUrl = function(formId) {
                return prepareUrl('/signature2/forms/signembed/' + formId);
            },
            formViewUrl = function(formId) {
                return prepareUrl('/signature2/forms/prepare/' + formId);
            },
            downloadFormDocumentsUrl = function(userId, privateKey, formId) {
                return prepareUrl('/signature2/service/GetSignedFormDocuments/' + userId + '/' + privateKey + '/' + formId);
            },
            formSigned = function(envelopeId, participantId) {
                return prepareUrl('/signature2/forms/signed/' + envelopeId + '/' + participantId);
            },
            downloadEnvelopeDocumentsUrl = function(userId, privateKey, envelopeId) {
                return prepareUrl('/signature2/service/GetSignedDocuments/' + userId + '/' + privateKey + '/' + envelopeId);
            },
            publicDownloadEnvelopeDocumentsUrl = function(envelopeId, recipientid) {
                return prepareUrl('/signature2/service/PublicGetSignedDocuments/' + envelopeId + "/" + recipientid);
            },
            publicDownloadFormDocumentsUrl = function(formId, participantId) {
                return prepareUrl('/signature2/service/PublicGetSignedFormDocuments/' + formId + "/" + participantId);
            },
            documentSign = function(documentId) {
                return prepareUrl("/signature2/documents/sign/" + documentId);
            },
            documentSignEmbed = function(documentId) {
                return prepareUrl("/signature/documents/signembed/" + documentId);
            },
            embedFormSignedUrl = function(envelopeId, participantId) {
                return prepareUrl('/signature2/forms/signedembed/' + envelopeId + '/' + participantId);
            }
            ;

        return {
            viewDocumentUrl: viewDocument,
            viewDocumentEmbedUrl: viewDocumentEmbedUrl,
            envelopeViewUrl: envelopeView,
            envelopeSignedUrl: envelopeSigned,
            envelopeSignUrl: envelopeSign,
            envelopeFieldsUrl: envelopeFields,
            envelopeDashboardUrl: envelopeDashboard,
            contactDashboardUrl: contactDashboard,
            signatureDashboardUrl: signatureDashboard,
            templateDashboardUrl: templateDashboard,
            formDashboardUrl: formDashboard,
            envelopeArchivedDashboardUrl: envelopeArchivedDashboard,
            formArchivedDashboardUrl: formArchivedDashboard,
            templateViewUrl: templateView,
            embedSignEnvelopeUrl: embedSignEnvelopeUrl,
            embedSignFormUrl: embedSignFormUrl,
            formViewUrl: formViewUrl,
            downloadFormDocumentsUrl: downloadFormDocumentsUrl,
            formSignedUrl: formSigned,
            embedEnvelopeSignedUrl: embedEnvelopeSigned,
            downloadEnvelopeDocumentsUrl: downloadEnvelopeDocumentsUrl,
            publicDownloadEnvelopeDocumentsUrl: publicDownloadEnvelopeDocumentsUrl,
            publicDownloadFormDocumentsUrl: publicDownloadFormDocumentsUrl,
            documentSignUrl: documentSign,
            documentSignEmbedUrl: documentSignEmbed,
            embedFormSignedUrl: embedFormSignedUrl
        };
    });
define('core/signalr',
    ['jquery', 
     'ko',
     'core/vm',
     'core/config'],
    function ($, ko, vm, config) {
        var init = function () {
            if (!$.connection || config.userId()=='') return;
            var signatureHub = $.connection.signature2Hub.client;
            signatureHub.showDesktopNotification = function (data) {                
                if (desktopNotificationsEnabled != undefined && desktopNotificationsEnabled == "True") {
                    if (window.webkitNotifications) {
                        $.desknoty({
                            icon: "/content/images/favicon.ico",
                            title: "Signature notification",
                            body: data
                        });
                    } else {
                        $.jNotify.init(data,
                            {
                                autoHide: true, // added in v2.0
                                clickOverlay: false, // added in v2.0
                                MinWidth: 250,
                                TimeShown: 8000,
                                ShowTimeEffect: 200,
                                HideTimeEffect: 200,
                                LongTrip: 20,
                                HorizontalPosition: 'right',
                                VerticalPosition: 'bottom',
                                ShowOverlay: false,
                                ColorOverlay: '#000',
                                OpacityOverlay: 0.3,
                                onClosed: function () {

                                },
                                onCompleted: function () {

                                }
                            }, 'jNotify');
                    }
                }
            };
            signatureHub.updateEnvelopeStatus = function (envelopeId, statusId) {
                if (envelopeId != null && statusId != null && vm.envelopes.envelopes().length > 0) {
                    ko.utils.arrayFilter(vm.envelopes.envelopes(), function (item) {                        
                        return item.id() == envelopeId;
                    })[0].status(statusId);
                }
            };
            signatureHub.updateFormParticipantsCount = function (formId, participantsCount) {
                if (formId != null && participantsCount != null && vm.forms.forms().length > 0) {
                    ko.utils.arrayFilter(vm.forms.forms(), function (item) {
                        return item.id() == formId;
                    })[0].participantsCount(participantsCount);
                }
            };
            var userAgent = window.navigator.userAgent;

            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
                $.connection.hub.start({ transport: 'longPolling' });
            }
            else {
                $.connection.hub.start();
            }
            
        };
        return {
            init: init
        };
    });
define('core/utils',
['lib/underscore'],
    function (_) {
        // IE8 array.filter patch
        if (!Array.prototype.filter) {
            Array.prototype.filter = function (fun /*, thisp*/) {
                'use strict';

                if (!this) {
                    throw new TypeError();
                }

                var objects = Object(this);
                var len = objects.length >>> 0;
                if (typeof fun !== 'function') {
                    throw new TypeError();
                }

                var res = [];
                var thisp = arguments[1];
                for (var i in objects) {
                    if (objects.hasOwnProperty(i)) {
                        if (fun.call(thisp, objects[i], i, objects)) {
                            res.push(objects[i]);
                        }
                    }
                }

                return res;
            };
        }
        //ie8 array.indexOf patch
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
                'use strict';
                if (this == null) {
                    throw new TypeError();
                }
                var n, k, t = Object(this),
                    len = t.length >>> 0;

                if (len === 0) {
                    return -1;
                }
                n = 0;
                if (arguments.length > 1) {
                    n = Number(arguments[1]);
                    if (n != n) { // shortcut for verifying if it's NaN
                        n = 0;
                    } else if (n != 0 && n != Infinity && n != -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                if (n >= len) {
                    return -1;
                }
                for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0) ; k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            };
        }
        
        var hasProperties = function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true;
                }
            }
            return false;
        },
            invokeFunctionIfExists = function(callback) {
                if (_.isFunction(callback)) {
                    callback();
                }
            },
            mapMemoToArray = function(items) {
                var underlyingArray = [];
                for (var prop in items) {
                    if (items.hasOwnProperty(prop)) {
                        underlyingArray.push(items[prop]);
                    }
                }
                return underlyingArray;
            },
            ensureValidFieldWidthAndHeight = function(location, fieldType) {
                if (location.locationHeight() == 0) {
                    switch (fieldType) {
                    case 1:
                        //signature
                        location.locationHeight(46);
                        break;
                    default:
                        location.locationHeight(25);
                        break;
                    }
                }
                if (location.locationWidth() == 0) {
                    switch (fieldType) {
                    case 1:
                        //signature
                        location.locationWidth(148);
                        break;
                    case 6:
                        //checkbox
                        location.locationWidth(25);
                        break;
                    default:
                        location.locationWidth(205);
                        break;
                    }
                }
            },
            decodeUtf8 = function(dotNetBytes) {
                var result = "";
                var i = 0;
                var c = c1 = c2 = 0;

                // Perform byte-order check.
                if (dotNetBytes.length >= 3) {
                    if ((dotNetBytes[0] & 0xef) == 0xef
                        && (dotNetBytes[1] & 0xbb) == 0xbb
                        && (dotNetBytes[2] & 0xbf) == 0xbf) {
                        // Hmm byte stream has a BOM at the start, we'll skip this.
                        i = 3;
                    }
                }

                while (i < dotNetBytes.length) {
                    c = dotNetBytes[i] & 0xff;

                    if (c < 128) {
                        result += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        if (i + 1 >= dotNetBytes.length)
                            throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
                        c2 = dotNetBytes[i + 1] & 0xff;
                        result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        if (i + 2 >= dotNetBytes.length || i + 1 >= dotNetBytes.length)
                            throw "Un-expected encoding error, UTF-8 stream truncated, or incorrect";
                        c2 = dotNetBytes[i + 1] & 0xff;
                        c3 = dotNetBytes[i + 2] & 0xff;
                        result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return result;
            },
            dateFromIso = function (dateStr, formatString) {
                var format = formatString || "mmm dd, yyyy HH:MM";
                var s = $.trim(dateStr);
                s = s.replace(/\.\d\d\d+/, ""); // remove milliseconds
                s = s.replace(/-/, "/").replace(/-/, "/");
                s = s.replace(/T/, " ").replace(/Z/, " UTC");
                s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
                return new Date(s).format(format);

            };

        
        return {
            hasProperties: hasProperties,
            invokeFunctionIfExists: invokeFunctionIfExists,
            mapMemoToArray: mapMemoToArray,
            ensureValidFieldWidthAndHeight: ensureValidFieldWidthAndHeight,
            decodeUtf8: decodeUtf8,
            dateFromIso: dateFromIso
        };
    });


define('core/vm',
    [
        'core/vm/vm.envelopes',
        'core/vm/vm.envelopes.resources',
        'core/vm/vm.quicksearch',
        'core/vm/vm.filednd',
        'core/vm/vm.envelope.prepare',
        'core/vm/vm.contacts',
        'core/vm/vm.contactsearch',
        'core/vm/vm.contactdetails',
        'core/vm/vm.contactselect',
        'core/vm/vm.navigationmenu',
        'core/vm/vm.templates',
        'core/vm/vm.templates.resources',
        'core/vm/vm.loading',
        'core/vm/vm.signatures',
        'core/vm/vm.signaturedetails',
        'core/vm/vm.signaturepad',
        'core/vm/vm.embedlink',
        'core/vm/vm.forms',
        'core/vm/vm.forms.resources',
        'core/vm/vm.viewer',
        'core/vm/vm.auditlog',
        'core/vm/vm.form.prepare',
        'core/vm/vm.envelope.sign',
        'core/vm/vm.envelope.prepare.step1',
        'core/vm/vm.envelope.prepare.step2',
        'core/vm/vm.envelope.prepare.step3',
        'core/vm/vm.envelope.prepare.step4',
        'core/vm/vm.envelope.prepare.step5',
        'core/vm/vm.envelope.prepare.step6',
        'core/vm/vm.form.signEmbed',
        'core/vm/vm.template.prepare',
        'core/vm/vm.template.prepare.step1',
        'core/vm/vm.template.prepare.step2',
        'core/vm/vm.template.prepare.step3',
        'core/vm/vm.template.prepare.step4',
        'core/vm/vm.template.prepare.step5',
        'core/vm/vm.template.prepare.step6',
        'core/vm/vm.envelope.signed',
        'core/vm/vm.form.signedEmbed',
        'core/vm/vm.error',
        'core/vm/vm.document.sign',
        'core/vm/vm.entername',
        'core/vm/vm.verify',
        'core/vm/vm.uploadprogress',
        'core/vm/vm.confirmSign',
        'core/vm/vm.form.validate',
        'core/vm/vm.form.signed',
        'core/vm/vm.form.participants',
        'core/vm/vm.document.prepare'
],
    function (
        envelopes,
        envelopesResources,
        quickSearch,
        filednd,
        envelopePrepare,
        contacts,
        contactsearch,
        contactdetails,
        contactSelect,
        navigationMenu,
        templates,
        templatesResources,
        loading,
        signatures,
        signatureDetails,
        signaturePad,
        embedLink,
        forms,
        formsResources,
        viewer,
        auditLog,
        formPrepare,
        envelopeSign,
        envelopePrepareStep1,
        envelopePrepareStep2,
        envelopePrepareStep3,
        envelopePrepareStep4,
        envelopePrepareStep5,
        envelopePrepareStep6,
        formSignEmbed,
        templatePrepare,
        templatePrepareStep1,
        templatePrepareStep2,
        templatePrepareStep3,
        templatePrepareStep4,
        templatePrepareStep5,
        templatePrepareStep6,
        envelopeSigned,
        formSignedEmbed,
        error,
        documentSign,
        enterName,
        verify,
        uploadprogress,
        confirmSign,
        formValidate,
        formSigned,
        formParticipants,
        documentPrepare
    ) {
        return {
            envelopes: envelopes,
            envelopesResources: envelopesResources,
            quickSearch: quickSearch,
            filednd: filednd,
            envelopePrepare: envelopePrepare,
            contacts: contacts,
            contactsearch: contactsearch,
            contactdetails: contactdetails,
            contactSelect: contactSelect,
            navigationMenu: navigationMenu,
            templates: templates,
            templatesResources: templatesResources,
            loading: loading,
            signatures: signatures,
            signatureDetails: signatureDetails,
            signaturePad: signaturePad,
            embedLink: embedLink,
            forms: forms,
            formsResources: formsResources,
            viewer: viewer,
            auditLog: auditLog,
            formPrepare: formPrepare,
            envelopeSign: envelopeSign,
            envelopePrepareStep1: envelopePrepareStep1,
            envelopePrepareStep2: envelopePrepareStep2,
            envelopePrepareStep3: envelopePrepareStep3,
            envelopePrepareStep4: envelopePrepareStep4,
            envelopePrepareStep5: envelopePrepareStep5,
            envelopePrepareStep6: envelopePrepareStep6,
            formSignEmbed: formSignEmbed,
            templatePrepare: templatePrepare,
            templatePrepareStep1: templatePrepareStep1,
            templatePrepareStep2: templatePrepareStep2,
            templatePrepareStep3: templatePrepareStep3,
            templatePrepareStep4: templatePrepareStep4,
            templatePrepareStep5: templatePrepareStep5,
            templatePrepareStep6: templatePrepareStep6,
            envelopeSigned: envelopeSigned,
            formSignedEmbed: formSignedEmbed,
            error: error,
            documentSign: documentSign,
            enterName: enterName,
            verify: verify,
            uploadprogress: uploadprogress,
            confirmSign: confirmSign,
            formValidate: formValidate,
            formSigned: formSigned,
            formParticipants: formParticipants,
            documentPrepare: documentPrepare
        };
    });
define('core/vm/vm.auditlog',
    ['jquery',
        'ko',
        'core/repository',
        'core/config'
    ],
    function ($, ko, repository, config) {
        var items = ko.observableArray([]);
        var filteredItems = ko.computed(function() {
            try {
                return ko.utils.arrayFilter(items(), function (item) {
                    return item.type() == selectedType() || selectedType()==0;
                });
            } catch (ex) {
                return [];
            }
        });
        var inprogress = ko.observable(false);
        var isVisible = ko.observable(false);
        var name = ko.observable("");
        var logType = [{ type: 0, text: "All" }, { type: 1, text: "General" }, { type: 2, text: "Email" }];
        var selectedType = ko.observable(0);
        var doOnKeyUp = function(event) {
            if (!isVisible()) return true;
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 27) {
                isVisible(false);
                return false;
            }
            return true;
        };
        var loadEnvelopeLog = function(envelopeId) {
            inprogress(true);
            items.removeAll();
            repository.envelope.getEnvelopeAuditLog({
                itemsResult: items,
                param: {
                    userId: config.userId(),
                    privateKey: config.privateKey(),
                    envelopeId: envelopeId
                },
                doneCallback: function() {
                    inprogress(false);
                },
                errorCallback: errorCallback
            });
        };
        var loadFormLog = function (formId) {
            inprogress(true);
            items.removeAll();
            repository.form.getFormAuditLog({
                itemsResult: items,
                param: {
                    userId: config.userId(),
                    privateKey: config.privateKey(),
                    formId: formId
                },
                doneCallback: function () {
                    inprogress(false);
                },
                errorCallback: errorCallback
            });
        };
        var errorCallback = function(error) {
            config.alert({ title: "Error", message: error });
            return false;
        };
        return {
            logType: logType,
            items: items,
            isVisible: isVisible,
            doOnKeyUp: doOnKeyUp,
            loadEnvelopeLog: loadEnvelopeLog,
            loadFormLog: loadFormLog,
            inprogress: inprogress,
            name: name,
            selectedType: selectedType,
            filteredItems: filteredItems
        };
    });
define('core/vm/vm.confirmSign',
    ['ko', 'core/config'],
    function (ko, config) {

        function getInstance() {
            var isVisible = ko.observable(false),
                onSign = ko.observable().extend({ notify: 'always' }),
                requireUserAuthForSign = ko.observable(false),
                requestUserAuthByPhoto = ko.observable(false),
                requestComment = ko.observable(false),
                canCapture = ko.observable(false),
                authData = ko.observable(""),
                comment = ko.escapedObservable(""),
                sign = function () {
                    if (canSign()) {
                        onSign({ authData: authData(), comment: comment() });
                        isVisible(false);
                    }
                },
                
                closeDialog = function() {
                    isVisible(false);
                },
                
                captureInfoText = ko.computed(function () {
                    var result = "";
                    if (requireUserAuthForSign()) {
                        result = "The owner of the form required you to authorize the signature \n";
                        result += canCapture() ? "Please capture a picture from your webcam" : "Your browser does not support this operation - you can't sign";
                    } else {
                        if (requestUserAuthByPhoto() && canCapture()) {
                           result = "The owner of the form requested you to authorize the signature \n";
                           result +=  "Please capture a picture from your webcam";
                       }
                    }
                    return result;
                }),
                captureInfoTextCss = ko.computed(function () {
                    var result = "small_text";
                    if (!canCapture() && requireUserAuthForSign())
                        result = "errorMessage";
                    return result;
                }),
                canSign = ko.computed(function() {
                    return !requireUserAuthForSign() || (requireUserAuthForSign && authData() && authData().length > 100);
                });

            requireUserAuthForSign.subscribe(function(value) {
                if (value) {
           //         authData = ko.observable(null).extend({ throttle: 500, required: { message: config.validationMessages.required } });
           //         ko.validation.group(authData);
                }
            });
            ko.validation.group(authData);

            return {
                isVisible: isVisible,
                closeDialog: closeDialog,
                onSign: onSign,
                requireUserAuthForSign: requireUserAuthForSign,
                requestUserAuthByPhoto: requestUserAuthByPhoto,
                captureInfoText: captureInfoText,
                canCapture: canCapture,
                captureInfoTextCss: captureInfoTextCss,
                authData: authData,
                canSign: canSign,
                sign: sign,
                requestComment: requestComment,
                comment: comment
        };
        }
        return getInstance;
    });
define('core/vm/vm.contactdetails',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config'],
    function ($, ko, _, repository, config) {
        var currentContact = ko.observable(null),
            inprogress = ko.observable(false),
            id = ko.observable(''),
            firstName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            lastName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            email = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, email: { message: config.validationMessages.invalidEmail }, noSpaces: {} }),
            completed = ko.observable(false),
            isVisible = ko.observable(false),
            addButtonVisible = ko.observable(false),
            updateButtonVisible = ko.observable(false),
            contactsVisible = ko.observable(false),
            validationModel = ko.validatedObservable({ firstName: firstName, lastName:lastName, email:email }),
            updateContact = function() {
                if (inprogress()) return;
                if (validationModel.isValid()) {
                    inprogress(true);
                    repository.contact.updateContact({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            contactId: id(),
                            firstName: firstName(),
                            lastName: lastName(),
                            email: email(),
                        },
                        doneCallback: function(result) {
                            inprogress(false);
                            if (result.status == 'Ok') {      
                                currentContact().firstName(result.result.contact.firstName);
                                currentContact().lastName(result.result.contact.lastName);
                                currentContact().email(result.result.contact.email);
                                closeContactForm();
                            } else {
                                config.alert("error",result.error_message);
                            }
                        },
                        errorCallback: function (error) {
                            config.alert("error", error);
                        }
                    });
                } else {
                    validationModel.errors.showAllMessages();
                }
            },
            addContact = function () {
                if (inprogress()) return;
                if (validationModel.isValid()) {
                    inprogress(true);
                    repository.contact.addContact({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            firstName: firstName(),
                            lastName: lastName(),
                            email: email(),
                        },
                        doneCallback: function (result) {
                            inprogress(false);
                            if (result.status == 'Ok') {
                                completed(true);//bind reload in external view
                                closeContactForm();
                            } else {
                                config.alert("error",result.error_message);
                            }
                        },
                        errorCallback: function (error) {
                            inprogress(false);
                            config.alert("error", error);
                        }
                    });
                } else {
                    validationModel.errors.showAllMessages();
                }
            },
            showEditForm = function (contact) {
                currentContact(contact);
                id(contact.id());
                firstName(contact.firstName());
                lastName(contact.lastName());
                email(contact.email());
                isVisible(true);
                completed(false);
                updateButtonVisible(true);
                addButtonVisible(false);
                contactsVisible(true);
            },

            showAddForm = function () {
                isVisible(true);
                completed(false);
                updateButtonVisible(false);
                addButtonVisible(true);
                contactsVisible(true);
            },
            
            closeContactForm = function() {
                firstName('');
                lastName('');
                email('');
                isVisible(false);
                contactsVisible(false);
            },
            doOnKeyUp = function(event) {
                if (!isVisible()) return true;
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    if (currentContact() != null){
                        this.updateContact();
                    } else {
                        this.addContact();
                    }
                    return false;
                }
                if (keyCode === 27) {
                    this.closeContactForm();
                    return false;
                }
                return true;
            },
            
            init = function () {
                validationModel.errors.showAllMessages();
            };
        
        init();
        
        return {
            id:id,
            firstName: firstName,
            lastName: lastName,
            email:email,
            showEditForm: showEditForm,
            showAddForm:showAddForm,
            addContact: addContact,
            updateContact: updateContact,
            closeContactForm: closeContactForm,
            completed: completed,
            doOnKeyUp: doOnKeyUp,
            addButtonVisible: addButtonVisible,
            updateButtonVisible: updateButtonVisible,
            contactsVisible: contactsVisible
        };
    });
define('core/vm/vm.contacts',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config'],
    function ($, ko, _, repository, config) {
        var contacts = ko.observableArray([]),
            inprogress = ko.observable(false),
            totalCount = ko.observable(10),
            page = ko.observable(1),
            itemsPerPage = ko.observable(1000),
            filterFirstName = ko.observable(''),
            filterLastName = ko.observable(''),
            filterEmail = ko.observable(''),
            importedItems = ko.observableArray([]),
            useAnd = ko.observable(false),
            loadContacts = function (options, callback) {
                if (inprogress()) return;

                if (options != null && options.clearAll != null && options.clearAll) {
                    contacts.removeAll();
                    totalCount(0);
                }
                var useAnd = false;
                if (options != null && options.page != null)
                    page(options.page);
                if (options != null && options.firstName != null && options.firstName != "First Name")
                    filterFirstName(options.firstName);
                if (options != null && options.lastName != null && options.lastName!="Last Name")
                    filterLastName(options.lastName);
                if (options != null && options.email != null && options.email != "Email")
                    filterEmail(options.email);
                if (options != null && options.useAnd != null)
                    useAnd=options.useAnd;
                
                inprogress(true);
                repository.contact.getContacts({
                    forceRefresh: true,
                    itemsResult: contacts,
                    itemsCount: totalCount,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        page: page(),
                        count: itemsPerPage(),
                        firstName: filterFirstName(),
                        lastName: filterLastName(),
                        email: filterEmail(),
                        useAnd:useAnd
                    },
                    doneCallback: function() {
                        inprogress(false);
                        resizeElements();
                    },
                    errorCallback: function (error) {
                        inprogress(false);
                        config.alert("error", error);
                    }
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            
            deleteContacts = function (contactsIds) {
                if (inprogress()) return;
                inprogress(true);
                repository.contact.deleteContacts({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        contactsIds: contactsIds
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        if (result.status == 'Ok') {
                            _.each(contactsIds, function(c) {
                                var con = ko.utils.arrayFirst(contacts(), function (cko) {
                                    return cko.id() == c;
                                });
                                contacts.remove(con);
                            });
                        } else {
                            config.alert("error",result.error_message);
                        }
                    },
                    errorCallback: function (error) {
                        config.alert("error", error);
                    }
                });
            },
            deleteContact = function (contact) {
                $.confirm({
                    title: "Delete confirmation",
                    message: "Are you sure you want to delete this contact ?",
                    buttons: {
                        Yes: {
                            'action': function () {
                                deleteContacts([contact.id()]);
                            }
                        },
                        No: { }
                    }
                });
            },
            
            onUploadCompleted = function (e, data) {
                if (data != null) {
                    importedItems.removeAll();
                    $.each(data, function (i) {
                        importedItems.push(this);
                    });
                    importUploadedContacts();
                }
            },
          
            importUploadedContacts = function() {
                inprogress(true);
                repository.contact.importContacts({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        contacts: importedItems()
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        if (result.status == 'Ok') { 
                            $('#importedContacts').text(result.result.imported);
                            $('#ignoredContacts').text(result.result.ignored);
                            $('#importContactsDialog').modal('show');
                            loadContacts({ clearAll: true, page: 1 });
                        } else {
                            config.alert("error",result.error_message);
                        }
                    },
                    errorCallback: function (error) {
                        config.alert("error", error);
                    }
                });
            },
            selectedItems = ko.computed( function (){
                return _.filter(contacts(), function (contact) {
                    return contact.selected() == true;
                });
            }),
            deleteSelected = function () {
                if (inprogress()) return;
                $.confirm({
                    title: "Delete confirmation",
                    message: "Are you sure you want to delete selected contacts?" ,
                    buttons: {
                        Yes: {
                            'class': "",
                            'action': function () {

                                var contactIds = [];
                                $.each(selectedItems(), function () {
                                        contactIds[contactIds.length] = this.id();
                                });
                                if (contactIds.length > 0) {
                                    deleteContacts(contactIds);
                                }
                            }
                        },
                        No: {}
                    }
                });
            },
            checkAll = function () {
                var newValue = !allSelected();
                _.each(contacts(), function (contact) {
                    contact.selected(newValue);
                });
            },
            allSelected = ko.computed(function () {
                 return contacts().length > 0 &&
                     $.grep(contacts(), function (contact) {
                         return contact.selected() == true;
                     }).length == contacts().length;
            }),
            getContactsByEmail = function(email, callback) {
                repository.contact.getContacts({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        page: 1,
                        firstName: "",
                        lastName: "",
                        email: email
                    },
                    doneCallback: function (contactsResult) {
                        if (_.isFunction(callback)) {
                            callback(contactsResult.result);
                        }
                    },
                    errorCallback: function (error) {
                        config.alert("error", error);
                    }
                });
            },
            addContact = function(firstName, lastName, email, callback) {
                repository.contact.addContact({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        firstName: firstName,
                        lastName: lastName,
                        email: email(),
                    },
                    doneCallback: function (result) {
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback: function (error) {
                        config.alert("error", error);
                    }
                });

            },
            init = function () {

            };
        
        init();
        
        return {
            inprogress: inprogress,
            loadContacts: loadContacts,
            totalCount: totalCount,
            page: page,
            itemsPerPage: itemsPerPage,
            contacts: contacts,
            deleteContact: deleteContact,
            onUploadCompleted: onUploadCompleted,
            selectedItems: selectedItems,
            deleteSelected: deleteSelected,
            allSelected: allSelected,
            checkAll: checkAll,
            getContactsByEmail: getContactsByEmail,
            addContact: addContact
        };
    });
define('core/vm/vm.contactsearch',
    [],
    function() {
        var firstName = ko.escapedObservable("").extend({ throttle: 500 }),
            lastName = ko.escapedObservable("").extend({ throttle: 500 }),
            email = ko.escapedObservable("").extend({ throttle: 500 });

        return {
            firstName: firstName,
            lastName: lastName,
            email:email
        };
    });
define('core/vm/vm.contactselect',
    ['ko', 'lib/underscore', 'core/repository', 'core/config'],
    function (ko, _, repository, config) {
        var inprogress = ko.observable(false),
            contacts = ko.observableArray([]),
            filter = ko.observable(''),
            filteredContacts = ko.computed(function () {
                return ko.utils.arrayFilter(contacts(), function (item) {
                    return item.firstName().toLowerCase().indexOf(filter().toLowerCase()) >= 0 || item.lastName().toLowerCase().indexOf(filter().toLowerCase()) >= 0 || item.email().toLowerCase().indexOf(filter().toLowerCase()) >= 0;
                });
            }),
            loadContacts = function(callback) {
                if (inprogress()) return;
                inprogress(true);                
                repository.contact.getContacts({
                    itemsResult: contacts,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        count: 2147483647
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                    }
                });
                if (_.isFunction(callback)) {
                    callback();
                }
            };
        return {
            inprogress: inprogress,
            loadContacts: loadContacts,
            contacts: contacts,
            filter: filter,
            filteredContacts: filteredContacts
        };
    });
define('core/vm/vm.document.prepare',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect',
    'core/model/model.document.recipient',
    'core/model/model.document.field',
    'core/model/model.document.fieldlocation'],
    function (ko, _, repository, config, redirect,recipientModel,fieldModel,locationModel) {
        function getInstance() {
            var
                inprogress = ko.observable(),
                //document = ko.observable(),
                documentId = ko.observable(),
                signatureFields = ko.observableArray([]),
                recipients = ko.observableArray([]),
                timer,
                activeRecipient = ko.observable( recipientModel.blank()),
                previewDocument = ko.observable(),
                fields = ko.observableArray([]),
                pageWidth = ko.observable(850),
                pageHeight = ko.observable(1200),
                cuttedLocation = ko.observable(),
                copiedLocation = ko.observable(),
                cuttedField = ko.observable(),
                copiedField = ko.observable(),
                selectedField = ko.observable(),
                selectedLocation = ko.observable(),
                signatureFieldFromGuid = function (fieldGuid) {
                    return _.find(signatureFields(), function (f) {
                        return f.id() == fieldGuid;
                    });
                },
                signatureFieldFromType = function (typeId) {
                    return _.find(signatureFields(), function (f) {
                        return f.fieldType() == typeId;
                    });
                },
                selectedFieldType = ko.computed({
                    read: function() {
                        return selectedField() != null ? selectedField().fieldType() : 0;
                    },
                    write: function (value) {
                        if (value != null && selectedField() != null && selectedLocation() != null) {
                            var signatureField = $.grep(fields(), function (a) {
                                return a.fieldType() == 1 && a.id() != selectedField().id();
                            });
                            var sourceType = selectedField().fieldType();
                            var targetType = value;
                            if (sourceType != config.signatureFieldType.Signature && targetType == config.signatureFieldType.Signature) {
                                if (signatureField.length > 0) {
                                    signatureField[0].locations.push(selectedLocation());
                                    selectedField().locations.remove(selectedLocation());
                                    fields.remove(selectedField());
                                } else {
                                    selectedField().fieldType(value);
                                }
                            } else if (selectedField().locations().length == 1) {
                                selectedField().fieldType(value);
                            //} else if (sourceType != config.signatureFieldType.Signature && targetType != config.signatureFieldType.Signature) {
                            //    selectedField().fieldType(value);
                            } else {
                                var fieldResult = fieldModel.blank();
                                var fieldId = fields().length + 1;
                                fieldResult.id(fieldId);
                                fieldResult.recipientId(activeRecipient().id());
                                fieldResult.order(fields.length - 1);
                                fieldResult.fieldType(value);
                                fieldResult.name(signatureFieldFromType(value).name());
                                fieldResult.prepareSettings(value);
                                fieldResult.locations = ko.observableArray([]);
                                fieldResult.locations.push(selectedLocation());
                                $.each(fields(), function() {
                                    var field = this;
                                    this.locations.remove(function (l) {
                                        return l.fieldId() != field.id();
                                    });
                                });
                                fields.push(fieldResult);
                                selectedLocation().fieldId(fieldId);
                            }
                        }
                    },
                    owner: this
                }),

                newAcceptableValue = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
                newAcceptableValueListName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
                dateFormats = ko.observableArray([]),
                viewerAction = 'prepare',

                loadSignatureFields = function() {

                    repository.field.getFields({
                        itemsResult: signatureFields,
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey()
                        },
                        doneCallback: function(result) {

                        },
                        errorCallback: errorCallback
                    });


                },


                cancelPrepare = function() {
                    redirect.envelopeDashboard();
                },
                getUniqueFieldName = function (fieldName) {
                    var sameFlds = _.filter(fields(), function(f) {
                        return f.name().match(fieldName+"_")!=null;
                    });
                    return fieldName +"_"+ (sameFlds.length + 1).toString();
                },

                addField = function (fieldId, pageNum, relativeX, relativeY, locationHeight, locationWidth, forceAddField, fieldName, locationProperties) {
                    var signatureFieldId = fieldId;
                    var forceNewField = forceAddField;
                    if (fieldId == config.signatureFieldType.Signature && $.grep(fields(), function (a) {
                        return a.fieldType() === parseInt(fieldId);
                    }).length > 0)
                        forceNewField = false;
                    var fieldResult = fieldModel.blank();
                    fieldResult.id(fields().length + 1);
                    fieldResult.recipientId(activeRecipient().id());
                    fieldResult.order(fields.length - 1);
                    fieldResult.fieldType(signatureFieldFromGuid(signatureFieldId).fieldType());
                    fieldResult.name(getUniqueFieldName(fieldName && fieldName.length > 0 ? fieldName : signatureFieldFromGuid(signatureFieldId).name()));
                    fieldResult.prepareSettings(fieldResult.fieldType());

                    var loca = locationModel.blank();
                    loca.fieldId(fieldResult.id());
                    loca.documentId(documentId());
                    loca.page(pageNum);
                    loca.locationX(relativeX);
                    loca.locationY(relativeY);
                    loca.locationWidth(locationWidth);
                    loca.locationHeight(locationHeight);
                    loca.fontName(locationProperties != null && locationProperties.fontName != null && locationProperties.fontName != '' ? locationProperties.fontName : "Arial");
                    loca.fontColor(locationProperties != null && locationProperties.fontColor != null && locationProperties.fontColor != '' ? locationProperties.fontColor : "black");
                    loca.fontSize(locationProperties != null && locationProperties.fontSize != null && locationProperties.fontSize > 0 ? locationProperties.fontSize : 10);
                    loca.fontSize(locationProperties != null && locationProperties.fontSize != null && locationProperties.fontSize > 0 ? locationProperties.fontSize : 10);
                    loca.align(locationProperties != null && locationProperties.align != null ? locationProperties.align : 0);
                    loca.fontBold(locationProperties != null && locationProperties.fontBold != null ? locationProperties.fontBold : false);
                    loca.fontItalic(locationProperties != null && locationProperties.fontItalic != null ? locationProperties.fontItalic : false);
                    loca.fontUnderline(locationProperties != null && locationProperties.fontUnderline != null ? locationProperties.fontUnderline : false);
                    fieldResult.locations = ko.observableArray([]);
                    fieldResult.locations.push(loca);

                    $.extend(fieldResult, { selected: ko.observable(false) });
                    $.extend(fieldResult, { selectedDirtyFlag: ko.DirtyFlag([fieldResult.selected]) });
                    if (forceNewField && !_.find(fields(), function (a) { return a.id() == fieldResult.id(); })) {
                        fields.push(fieldResult);
                    } else {
                        var mainField = $.grep(fields(), function (a) {
                            return a.fieldType() == parseInt(fieldId);
                        })[0];
                        loca.fieldId(mainField.id());
                        mainField.locations.push(fieldResult.locations.pop());
                    }

                },
                addLocation = function(field, locationProperties) {
                    if (field == null || locationProperties == null) return;
                    var location = locationModel.blank();
                    location.fieldId(field.id());
                    location.documentId(documentId());
                    location.page(locationProperties.pageNum);
                    location.locationX(locationProperties.relativeX);
                    location.locationY(locationProperties.relativeY);
                    location.locationWidth(locationProperties.locationWidth);
                    location.locationHeight(locationProperties.locationHeight);
                    location.fontName(locationProperties.fontName != null && locationProperties.fontName != '' ? locationProperties.fontName : "Arial");
                    location.fontColor(locationProperties.fontColor != null && locationProperties.fontColor != '' ? locationProperties.fontColor : "black");
                    location.fontSize(locationProperties.fontSize != null && locationProperties.fontSize > 0 ? locationProperties.fontSize : 10);
                    location.fontSize(locationProperties.fontSize != null && locationProperties.fontSize > 0 ? locationProperties.fontSize : 10);
                    location.align(locationProperties.align != null ? locationProperties.align : 0);
                    location.fontBold(locationProperties.fontBold != null ? locationProperties.fontBold : false);
                    location.fontItalic(locationProperties.fontItalic != null ? locationProperties.fontItalic : false);
                    location.fontUnderline(locationProperties.fontUnderline != null ? locationProperties.fontUnderline : false);
                    field.locations.push(location);
                },

                updateFieldLocation = function(location, callback) {
                    if (!location) return;
                    if (_.isFunction(callback)) {
                        callback(location);
                    }
                },
                deleteFieldLocation = function(field, location) {


                    field.locations.remove(location);
                    if (field.locations().length == 0) {
                        fields.remove(field);
                    }
                    selectedField(null);
                    selectedLocation(null);
                },
                isValidDate = function(s) {
                    if (!s || s.length == 0) return true;
                    if (s.length != 10) return false;
                    var bits = s.split('.');
                    if (!bits[0] || !bits[1] || !bits[2]) return false;
                    if (bits[2] < 1900 || bits[2] > 2100) return false;
                    var d = new Date(bits[2], bits[1] - 1, bits[0]);
                    return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
                },
                updateField = function(field, callback) {
                    if (!field) return;
                    if (!field.isValid()) {
                        config.alert({ title: "Field not saved", message: 'Field data is not valid' });
                        return;
                    }
                    if (field.fieldType() > 1 && field.fieldType() < 5 && field.defaultValue() != '') {
                        if (field.regularExpression() != null && !field.defaultValue().match(field.regularExpression())) {
                            config.alert({ title: "Field not saved", message: 'Default value is not valid' });
                            return;
                        }
                        if (field.fieldType() == 4 && field.regularExpression() == null && !isValidDate(field.defaultValue())) {
                            config.alert({ title: "Field not saved", message: 'Default date is not valid' });
                            return;
                        }
                    }


                    field.dirtyFlag().reset();

                },


                updateMovedField = function(location, event) {
                    if (!location.selected()) return;
                    clearInterval(timer);
                    timer = setTimeout(function() {
                        if (event.keyCode > -37 && event.keyCode <= 40)
                            updateFieldLocation(location);
                    }, 2000);
                },
                copyFieldLocation = function(field, location) {
                    if (location.selected()) {
                        copiedLocation(location);
                        copiedField(field);
                        cuttedLocation(null);
                        cuttedField(null);
                    }
                },
                cutFieldLocation = function(field, location) {
                    if (location.selected()) {
                        if (field == null) return;
                        cuttedLocation(location);
                        cuttedField(field);
                        copiedLocation(null);
                        copiedField(null);
                        field.locations.remove(location);
                    }
                },
                pasteNewField = function() {
                    if (copiedLocation() != null && copiedField() != null) {
                        var signatureCopiedField = $.grep(signatureFields(), function(a) { return a.fieldType() == copiedField().fieldType(); })[0];
                        addField(signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), true, '', {
                            fontName: copiedLocation().fontName(),
                            fontColor: copiedLocation().fontColor(),
                            fontSize: copiedLocation().fontSize(),
                            fontBold: copiedLocation().fontBold(),
                            fontItalic: copiedLocation().fontItalic(),
                            fontUnderline: copiedLocation().fontUnderline(),
                            align: copiedLocation().align()
                        });
                        copiedLocation(null);
                        copiedField(null);
                        cuttedLocation(null);
                        cuttedField(null);
                    }
                    if (cuttedLocation() != null && cuttedField() != null) {
                        var signatureCuttedField = $.grep(signatureFields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                        addField(signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX(), cuttedLocation().locationY(), cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), true, '', {
                            fontName: copiedLocation().fontName(),
                            fontColor: copiedLocation().fontColor(),
                            fontSize: copiedLocation().fontSize(),
                            fontBold: copiedLocation().fontBold(),
                            fontItalic: copiedLocation().fontItalic(),
                            fontUnderline: copiedLocation().fontUnderline(),
                            align: copiedLocation().align()
                        });
                        deleteFieldLocation(cuttedField(), cuttedLocation());
                        copiedLocation(null);
                        copiedField(null);
                        cuttedLocation(null);
                        cuttedField(null);
                    }
                },
                pasteNewLocation = function() {
                    if (copiedLocation() != null && copiedField() != null) {
                        //var documentCopiedField = $.grep(fields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                        //var signatureCopiedField = $.grep(signatureFields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                        addLocation(copiedField(), {
                            pageNum: copiedLocation().page(),
                            relativeX: copiedLocation().locationX() + 0.05,
                            relativeY: copiedLocation().locationY() + 0.05,
                            locationWidth: copiedLocation().locationWidth(),
                            locationHeight: copiedLocation().locationHeight(),
                            fontName: copiedLocation().fontName(),
                            fontColor: copiedLocation().fontColor(),
                            fontSize: copiedLocation().fontSize(),
                            fontBold: copiedLocation().fontBold(),
                            fontItalic: copiedLocation().fontItalic(),
                            fontUnderline: copiedLocation().fontUnderline(),
                            align: copiedLocation().align()
                        });
                        //addField(documentCopiedField != null ? copiedLocation().fieldId() : signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), documentCopiedField != null ? false : true, documentCopiedField != null ? copiedField().name() : '', {
                        //    fontName: copiedLocation().fontName(),
                        //    fontColor: copiedLocation().fontColor(),
                        //    fontSize: copiedLocation().fontSize(),
                        //    fontBold: copiedLocation().fontBold(),
                        //    fontItalic: copiedLocation().fontItalic(),
                        //    fontUnderline: copiedLocation().fontUnderline(),
                        //    align: copiedLocation().align()
                        //});
                        copiedLocation(null);
                        copiedField(null);
                        cuttedLocation(null);
                        cuttedField(null);
                    }
                    if (cuttedLocation() != null && cuttedField() != null) {
                        var documentCuttedField = $.grep(fields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                        var signatureCuttedField = $.grep(signatureFields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                        addField(documentCuttedField != null ? cuttedLocation().fieldId() : signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX() + 0.05, cuttedLocation().locationY() + 0.05, cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), documentCuttedField != null ? false : true, documentCuttedField != null ? cuttedField().name() : '', {
                            fontName: copiedLocation().fontName(),
                            fontColor: copiedLocation().fontColor(),
                            fontSize: copiedLocation().fontSize(),
                            fontBold: copiedLocation().fontBold(),
                            fontItalic: copiedLocation().fontItalic(),
                            fontUnderline: copiedLocation().fontUnderline(),
                            align: copiedLocation().align()
                        });
                        deleteFieldLocation(cuttedField(), cuttedLocation());
                        copiedLocation(null);
                        copiedField(null);
                        cuttedLocation(null);
                        cuttedField(null);
                    }
                },
                addFieldFromMenu = function(fieldType) {
                    var signatureField = $.grep(signatureFields(), function(a) { return a.fieldType() == fieldType; })[0];
                    var height, width;
                    switch (fieldType) {
                    case 1:
                        //signature
                        height = 46;
                        width = 148;
                        break;
                    case 6:
                        //checkbox
                        height = 25;
                        width = 25;
                        break;
                    default:
                        height = 25;
                        width = 205;
                        break;
                    }
                    addField(signatureField.id(), 1, 0, 0, height, width, true, '');
                },
                selectDefaultValue = function(value) {
                    if (selectedField() != null)
                        selectedField().defaultValue(value);
                },
                addAcceptableValue = function() {
                    newAcceptableValue($.trim(newAcceptableValue()));
                    if ($.grep(newAcceptableValue.errors(), function(error) {
                        return error != null;
                    }).length > 0) {
                        newAcceptableValue.errors.showAllMessages(true);
                        return;
                    };


                    if (selectedField() != null && newAcceptableValue() != '') {
                        if (selectedField().acceptableValuesArray().indexOf(newAcceptableValue()) > -1) {
                            config.alert({ title: "Error", message: "Value already in list" });
                            return;
                        }
                        selectedField().acceptableValuesArray.push(newAcceptableValue());
                        newAcceptableValue('');
                        newAcceptableValue.errors.showAllMessages(false);
                    }

                },
                deleteAcceptableValue = function(value) {
                    $.confirm({
                        title: "Delete Confirmation",
                        message: "Are you sure ?",
                        buttons: {
                            Yes: {
                                action: function() {
                                    selectedField().acceptableValuesArray.remove(value);
                                    if (selectedField().defaultValue() == value)
                                        selectedField().defaultValue('');
                                }
                            },
                            No: {}
                        }
                    });
                },


                resetFields = function() {

                    $.confirm({
                        title: "Reset confirmation",
                        message: "Are you sure you want to reset all fields? This will remove all placed fields.",
                        buttons: {
                            Yes: {
                                action: function() {
                                    fields.removeAll();
                                }
                            },
                            No: {}
                        }
                    });
                },

                isOwnField = function(field) {
                    return true; // compatibilty with envelope viewer 
                },

                regularExpressions = ko.computed(function() {
                    if (selectedField() != null && (selectedField().fieldType() == config.signatureFieldType.SingleLine || selectedField().fieldType() == config.signatureFieldType.SingleLine || selectedField().fieldType() == config.signatureFieldType.Date)) {
                        return config.fieldValidations.filter(function(item) {
                            return $.grep(item.fieldType.split(','), function(e) { return e == selectedField().fieldType(); })[0] != null;
                        });
                    } else
                        return [];
                }),
                getSignatureDocument = function(docGuid, recGuid, callback) {
                    repository.document.getDocument({
                        param: {
                            documentGuid: docGuid,
                            recipientGuid: recGuid
                        },
                        doneCallback: function(docResult) {
                            inprogress(false);
                            if (config.isDownloadable) {
                                activeRecipient().firstName(docResult.result.document.recipient.firstName);
                                activeRecipient().lastName(docResult.result.document.recipient.lastName);
                                activeRecipient().email(docResult.result.document.recipient.email);
                                activeRecipient().userGuid(docResult.result.document.recipient.guid);
                                documentId(docGuid);
                                getDocumentFields();
                            }
                            //if (!docResult.result.document.signedFromAll && !docResult.result.document.recipientSigned)
                            //    getDocumentFields();
                            callback(docResult.result.document);
                        },
                        errorCallback: errorCallback
                    });
                },
                getDocumentFields = function() {
                    repository.document.getFields({
                        param: {
                            recipientGuid:activeRecipient().userGuid(),
                            documentGuid: documentId(),
                            
                        },
                        doneCallback: function (fieldsResult) {
                            if (fieldsResult.length > 0) {
                                $.each(fieldsResult, function() {
                                    var item = this;

                                    fields.push(item);
                                });
                                if (viewerContainer() != null) $(viewerContainer()).trigger("fieldsLoaded.groupdocs", fields().length);
                            }
                        },
                        errorCallback: function() {
                                config.alert({ title: "Error", message: "Error Getting fields" });
                        }
                    });
                },
                viewerContainer = ko.observable(),
                saveFields = function (callback) {
                    inprogress(true);
                    
                    repository.document.saveDocumentsFields({
                        param: {
                            fields: ko.mapping.toJS(fields),
                            documentGuid: documentId(),
                            recipientGuid: activeRecipient().userGuid(),
                        },
                        successCallback: function (response) {
                            if (_.isFunction(callback)) {
                                callback(response.result.document);
                            }
                            if (viewerContainer() != null) $(viewerContainer()).trigger("documentPrepared.groupdocs", response.result);
                            
                        },
                        errorCallback: errorCallback
                    });
                },
                errorCallback = function(error) {

                    config.alert({ title: "Error", message: error });
                    return false;
                };


            ko.validation.group(newAcceptableValue);
            ko.validation.group(newAcceptableValueListName);

            return {
                inprogress:inprogress,
                documentId: documentId,
                cancelPrepare: cancelPrepare,
                previewDocument: previewDocument,
                signatureFields: signatureFields,
                fields: fields,
                pageWidth: pageWidth,
                pageHeight: pageHeight,
                addField: addField,
                updateFieldLocation:updateFieldLocation,
                deleteFieldLocation: deleteFieldLocation,
                updateMovedField: updateMovedField,

                cuttedLocation: cuttedLocation,
                copiedLocation: copiedLocation,
                cuttedField: cuttedField,
                copiedField: copiedField,
                selectedField: selectedField,
                selectedLocation: selectedLocation,
                copyFieldLocation: copyFieldLocation,
                cutFieldLocation: cutFieldLocation,
                pasteNewField: pasteNewField,
                pasteNewLocation: pasteNewLocation,
                addFieldFromMenu: addFieldFromMenu,
                activeRecipient:activeRecipient,

                config: config,
                newAcceptableValue: newAcceptableValue,
                newAcceptableValueListName: newAcceptableValueListName,


                selectDefaultValue: selectDefaultValue,
                addAcceptableValue: addAcceptableValue,
                deleteAcceptableValue: deleteAcceptableValue,

                isOwnField: isOwnField,
                updateField: updateField,
                resetFields: resetFields,

                loadSignatureFields: loadSignatureFields,
                viewerAction: viewerAction,
                getSignatureDocument:getSignatureDocument,
                viewerContainer:viewerContainer,
                regularExpressions: regularExpressions,
                saveFields: saveFields,
                dateFormats: dateFormats,
                selectedFieldType: selectedFieldType
            };
        }
        return getInstance;
    });
define('core/vm/vm.document.sign',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function ($, ko, _, repository, configuration, redirect) {

        function getInstance() {
            var viewerAction = 'sign',
                config = configuration,
                documentId = ko.observable(),
                isPublic = ko.observable(true),
                inprogress = ko.observable(false),
                signature = ko.observable(''),
                fields = ko.observableArray([]),
                signatureFields = ko.observableArray([]),
                name = ko.observable(''),
                email = ko.observable(''),
                isOwnField = ko.observable(true),
                documentGuid = ko.observable(),
                recipientGuid = ko.observable(),
                relativeCorrection = ko.observable(1),
                hasCalcFields = ko.observable(false),
                recipient = {
                    firstName: ko.observable(''),
                    lastName: ko.observable(''),
                    email: ko.observable('')
                },
                signDocument = function(callback) {
                    inprogress(true);
                    var fieldsData = [];
                    ko.utils.arrayForEach(fields(), function(item) {
                        var field = {
                            fieldType: item.fieldType(),
                            data: item.data(),
                            locations: [],
                            id: item.id()
                        };
                        _.each(item.locations(), function(l) {
                            var location = {
                                page: l.page(),
                                locationX: l.locationX(),
                                locationY: l.locationY(),
                                locationWidth: l.locationWidth(),
                                locationHeight: l.locationHeight(),
                                fontName: l.fontName != null ? l.fontName() : null,
                                fontSize: l.fontSize != null ? l.fontSize() : null,
                                fontColor: l.fontColor != null ? l.fontColor() : null,
                                fontBold: l.fontBold != null ? l.fontBold() : null,
                                fontItalic: l.fontItalic != null ? l.fontItalic() : null,
                                fontUnderline: l.fontUnderline != null ? l.fontUnderline() : null,
                                alignment: l.align != null ? l.align() : null,
                                id: l.id != null ? l.id() : null
                            };
                            field.locations.push(location);
                        });
                        fieldsData.push(field);
                    });
                    repository.document.signDocument({
                        param: {
                            documentId: documentId(),
                            name: name(),
                            waterMarkText: '',
                            waterMarkImage: '',
                            fields: fieldsData,
                            documentGuid: documentGuid(),
                            recipientGuid: recipientGuid(),
                            email:email()
                        },
                        successCallback: function(response) {
                            if (!config.isDownloadable)
                                getDocumentStatus(response.result.jobId);
                            else {
                                if (_.isFunction(callback)) {
                                    callback(response.result.document);
                                }
                                if (viewerContainer() != null) $(viewerContainer()).trigger("documentSigned.groupdocs", response.result);
                            }
                        },
                        errorCallback: errorCallback
                    });
                },
                getDocumentStatus = function(jobId) {
                    repository.document.getStatus({
                        param: {
                            jobId: jobId
                        },
                        doneCallback: function(response) {
                            if (response.result.documents.length == 1) {
                                if (response.result.documents[0].status == 1) {
                                    setTimeout(function() {
                                        getDocumentStatus(jobId);
                                    }, 2000);
                                } else {
                                    inprogress(false);
                                    if (!isPublic())
                                        redirect.viewDocument(response.result.documents[0].documentId);
                                    else
                                        redirect.viewDocumentEmbed(response.result.documents[0].documentId);
                                }
                            }
                        },
                        errorCallback: errorCallback
                    });
                },
                errorCallback = function(error) {
                    if (config.viewerContainer != null) $(config.viewerContainer).trigger("error.groupdocs", error);
                    config.alert({ title: "Error", message: error });
                    return false;
                },
                updateFieldLocation = function() {
                },
                addField = function(fieldId, pageNum, relativeX, relativeY, height, width, forceNew, fieldName) {
                    var field = _.find(fields(), function(f) { return f.fieldId() == fieldId; });
                    if (!field) return;
                    field.locations.push(
                        {
                            page: ko.observable(pageNum),
                            locationY: ko.observable(relativeY),
                            locationX: ko.observable(relativeX),
                            locationWidth: ko.observable(width),
                            locationHeight: ko.observable(height),
                            selected: ko.observable(true),
                            fieldId: ko.observable('signature'),
                            locked: ko.observable(false)
                        });
                },
                fieldsToBeFilled = function () {
                    if (!fields() || fields().length == 0)
                        return -1;
                    var invalidFields = 0;
                    $.each(fields(), function() {
                        if (isOwnField(this)) {
                            if (!this.isValid()) {
                                invalidFields++;
                            }
                        }
                    });
                    return invalidFields;
                },
                createDefaultField = function () {
                    fields.push(repository.document.getDefaultField());
                },
                getSignatureDocument = function(docGuid, recGuid, callback) {
                    repository.document.getDocument({
                        param: {
                            documentGuid: docGuid,
                            recipientGuid: recGuid
                        },
                        doneCallback: function (docResult) {
                            inprogress(false);
                            if (config.isDownloadable) {
                                recipient.firstName(docResult.result.document.recipient.firstName);
                                recipient.lastName(docResult.result.document.recipient.lastName);
                                recipient.email(docResult.result.document.recipient.email);
                            }
                            if (!docResult.result.document.signedFromAll && !docResult.result.document.recipientSigned)
                                getDocumentFields();
                            callback(docResult.result.document);
                        },
                        errorCallback: errorCallback
                    });
                },
                getDocumentFields = function() {
                    repository.document.getFields({
                        param: {
                            documentId: documentId(),
                            documentGuid: documentGuid(),
                            recipientGuid: recipientGuid()
                        },
                        doneCallback: function (fieldsResult) {
                            if (fieldsResult.length > 0) {
                                // Added for Signature 3
                                fields.removeAll();
                                // end

                                $.each(fieldsResult, function () {
                                    var item = this;
                                    var validators = {};
                                    if (item.fieldType() != configuration.signatureFieldType.Date) {
                                        if (item.regularExpression() != null && item.regularExpression() != '') {
                                            var validation = $.grep(config.fieldValidations, function (r) { return r.expression == item.regularExpression(); });
                                            var errorMessage;
                                            if (validation.length > 0) {
                                                errorMessage = validation[0].name;
                                            } else {
                                                errorMessage = config.validationMessages.invalidValue;
                                            }
                                            validators.pattern = { params: item.regularExpression(), message: errorMessage };
                                        }
                                    }
                                    if (item.mandatory()) {
                                        validators.required = { message: (item.tooltip() != '' ? item.tooltip() : item.name()) + " - " + config.validationMessages.requiredNoStar };
                                        if (item.fieldType() == configuration.signatureFieldType.Checkbox)
                                            validators.validation = {
                                                validator: function (val) {
                                                    return val && val == 'on';
                                                }
                                            };
                                    }
                                    if ((item.data() == null || item.data() == '') && item.defaultValue() != null && item.defaultValue() != '') {
                                        if (item.fieldType() == config.signatureFieldType.File || item.fieldType() == config.signatureFieldType.Stamp) {
                                            item.data(JSON.stringify({ data: item.defaultValue() }));
                                        } else {
                                            item.data(item.defaultValue());
                                        }
                                    }
                                    ko.utils.arrayForEach(item.locations(), function(location) {
                                        $.extend(location, { locked: ko.observable(item.lockDuringSign()) });
                                    });
                                    item.data.extend(validators);
                                    fields.push(item);
                                    if (!hasCalcFields() && item.isCalcField()) hasCalcFields(true);
                                });
                                if (viewerContainer() != null) $(viewerContainer()).trigger("fieldsLoaded.groupdocs", fields().length);
                            } else {
                                if (!recipientGuid() || recipientGuid()=='')
                                    createDefaultField();
                                else
                                    config.alert({ title: "Error", message: "There are no defined fields for this recipient" });
                            }
                        },
                        errorCallback: function () {
                            if (!recipientGuid() || recipientGuid() == '')
                                createDefaultField();
                            else
                                config.alert({ title: "Error", message: "There are no defined fields for this recipient" });
                        }
                    });
                },
                viewerContainer = ko.observable(),
                fileUploaded = function (field, location, evt) {
                    if (config.checkFileApiSupport()) {
                        var frField = new FileReader();
                        frField.onload = function (e) {
                            field.data(JSON.stringify({
                                size: evt.target.files[0].size,
                                type: evt.target.files[0].type,
                                name: evt.target.files[0].name,
                                data: e.target.result
                            }));
                        };
                        frField.readAsDataURL(evt.target.files[0]);
                    } else {
                        requirejs(['lib/fileApi/FileAPI'], function () {
                            var files = FileAPI.getFiles(evt);
                            FileAPI.readAsDataURL(files[0], function (dataUrlObject) {
                                if (dataUrlObject.type == 'load') {
                                    field.data(JSON.stringify({
                                        size: files[0].size,
                                        type: files[0].type,
                                        name: files[0].name,
                                        data: dataUrlObject.result
                                    }));
                                }
                            });
                        });
                    }
                },

                init = function () {
                    fields.removeAll();
                    if (!isPublic()) {
                        repository.field.getFields({
                            itemsResult: signatureFields,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey()
                            },
                            doneCallback: function(signaturefieldsResult) {
                                inprogress(false);

                            },
                            errorCallback: errorCallback
                        });

                    }
                    if (documentId()!="")
                        getDocumentFields();
                };

            //init();

            return {
                init: init,
                viewerAction: viewerAction,
                config: config,
                documentId: documentId,
                isPublic: isPublic,
                inprogress: inprogress,
                signDocument: signDocument,
                signature: signature,
                signatureFields: signatureFields,
                fields: fields,
                updateFieldLocation: updateFieldLocation,
                addField: addField,
                name: name,
                isOwnField: isOwnField,
                fieldsToBeFilled: fieldsToBeFilled,
                documentGuid: documentGuid,
                recipientGuid: recipientGuid,
                getSignatureDocument: getSignatureDocument,
                viewerContainer: viewerContainer,
                relativeCorrection: relativeCorrection,
                email: email,
                fileUploaded: fileUploaded,
                recipient: recipient,
                hasCalcFields: hasCalcFields
            };
        }

        return getInstance;
    });
define('core/vm/vm.embedlink',
    ['jquery',
        'ko'
    ],
    function ($, ko) {
        var link = ko.observable(),
            title = ko.observable(),
            isVisible = ko.observable(false),
            doOnKeyUp = function (event) {
                if (!isVisible()) return true;
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 27) {
                    isVisible(false);
                    return false;
                }
                return true;
            };
        return {
            link: link,
            isVisible: isVisible,
            doOnKeyUp: doOnKeyUp,
            title:title
        };
    });
define('core/vm/vm.entername',
    ['ko', 'core/config'],
    function (ko, config) {

        function getInstance() {
            var isVisible = ko.observable(false),
                onNameSet = ko.observable().extend({ notify: 'always' }),
                requireUserAuthForSign = ko.observable(false),
                requestUserAuthByPhoto = ko.observable(false),
                canCapture = ko.observable(false),
                requestComment = ko.observable(false),
                userIdentedByEmail = ko.observable(false),
                signerName = {
                    firstName: ko.escapedObservable("").extend({ throttle: 500, required: { message: config.validationMessages.required } }),
                    lastName: ko.escapedObservable("").extend({ throttle: 500, required: { message: config.validationMessages.required } }),
                    authData:  ko.observable(),
                    comment: ko.escapedObservable(""),// : ko.observable(null).extend({ throttle: 500, required: { message: config.validationMessages.required } })
                    email: ko.escapedObservable("").extend({ email: { message: config.validationMessages.invalidEmail }, required: { message: config.validationMessages.required } }),
                },
                closeDialog = function() {
                    isVisible(false);
                },
                setName = function() {
                    if (!signerName.isValid()) {
                        signerName.errors.showAllMessages(true);
                        return;
                    }
                    isVisible(false);
                    onNameSet(signerName.firstName() + ' ' + signerName.lastName());
                },
                setDefaultName = function (firstName, lastName, userPrimaryEmail) {
                    signerName.firstName(firstName);
                    signerName.lastName(lastName);
                    signerName.email(userPrimaryEmail);
                },
                captureInfoText = ko.computed(function () {
                    var result = "";
                    if (requireUserAuthForSign()) {
                        result = "The owner of the form required you to authorize the signature \n";
                        result += canCapture() ? "Please capture a picture from your webcam" : "Your browser does not support this operation - you can't sign the form";
                    } else {
                        if (requestUserAuthByPhoto() && canCapture()) {
                           result = "The owner of the form requested you to authorize the signature \n";
                           result +=  "Please capture a picture from your webcam";
                       }
                    }
                    return result;
                }),
                captureInfoTextCss = ko.computed(function () {
                    var result = "small_text";
                    if (!canCapture() && requireUserAuthForSign())
                        result = "errorMessage";
                    return result;
                });

            requireUserAuthForSign.subscribe(function(value) {
                if (value) {
                    signerName.authData = ko.observable(null).extend({ throttle: 500, required: { message: config.validationMessages.required } });
                    ko.validation.group(signerName);
                }
            });
            ko.validation.group(signerName);

            return {
                signerName: signerName,
                isVisible: isVisible,
                closeDialog: closeDialog,
                setName: setName,
                onNameSet: onNameSet,
                setDefaultName: setDefaultName,
                requireUserAuthForSign:requireUserAuthForSign,
                requestUserAuthByPhoto: requestUserAuthByPhoto,
                captureInfoText: captureInfoText,
                canCapture: canCapture,
                captureInfoTextCss: captureInfoTextCss,
                requestComment: requestComment,
                userIdentedByEmail: userIdentedByEmail
            };
        }
        return getInstance;
    });
define('core/vm/vm.envelope.prepare',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            envelope = ko.observable(),
            documents = ko.observableArray([]),
            loadEnvelope = function(envelopeId, callback) {
                inprogress(true);
                repository.envelope.getEnvelope({
                    itemsResult: envelope,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            loadDocuments = function (envelopeId, callback) {
                inprogress(true);
                documents.removeAll();
                repository.envelopeDocument.getDocuments({
                    documentResult: documents,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            updateEnvelope = function (callback) {
                inprogress(true);
                repository.envelope.renameEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        name: envelope().name(),
                    },
                    doneCallback: function(renameResult) {
                        repository.envelope.updateEnvelope({
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: envelope().id(),
                                name: envelope().name(),
                                emailBody: envelope().emailBody(),
                                emailSubject: envelope().emailSubject(),
                                envelopeExpireTime: envelope().envelopeExpireTime(),
                                orderedSignature: envelope().orderedSignature(),
                                ownerShouldSign: envelope().ownerShouldSign(),
                                reminderTime: envelope().reminderTime(),
                                stepExpireTime: envelope().stepExpireTime(),
                                waterMarkText: envelope().waterMarkText(),
                                waterMarkImage: envelope().waterMarkImage(),
                                attachSignedDocument: envelope().attachSignedDocument(),
                                includeViewLink: envelope().includeViewLink(),
                                canBeCommented: envelope().canBeCommented(),
                                inPersonSign: envelope().inPersonSign(),
                                enableTypedSignature: envelope().enableTypedSignature(),
                                enableUploadedSignature: envelope().enableUploadedSignature(),
                                requireUserAuthForSign: envelope().requireUserAuthForSign(),
                                requestUserAuthByPhoto: envelope().requestUserAuthByPhoto(),
                                showRecipientCommentInSignedDocument: envelope().showRecipientCommentInSignedDocument(),
                                tags: envelope().tags()
                            },
                            doneCallback: function(envelopeResult) {
                                inprogress(false);
                                updateRecipientsOrder(function () {
                                    if (_.isFunction(callback))
                                        callback();
                                    else
                                        redirect.envelopeDashboard();
                                },true);
                        },
                            errorCallback: errorCallback
                        });
                    },
                    errorCallback: errorCallback
                });
            },
            sendEnvelope = function () {
                updateRecipientsOrder(function() {
                    updateEnvelope(function() {
                        repository.envelope.sendEnvelope({
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: envelope().id()
                            },
                            doneCallback: function() {
                                inprogress(false);
                                  redirect.envelopeDashboard();
                            },
                            errorCallback: errorCallback
                        });
                    });
                });
            },
            sendAndSign = function() {
                updateRecipientsOrder(function () {
                    updateEnvelope(function () {
                        repository.envelope.sendEnvelope({
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: envelope().id()
                            },
                            doneCallback: function () {
                                inprogress(false);
                                if (envelope().inPersonSign())
                                    redirect.embedEnvelopeSign(envelope().id(), envelope().recipients()[0].id());
                                else
                                    redirect.envelopeSign(envelope().id());
                            },
                            errorCallback: errorCallback
                        });
                    });
                });
            },
            cancelPrepare = function() {
                redirect.envelopeDashboard();
            },
            updateRecipientsOrder = function (sucessCallback, forceUpdate) {
                if (typeof(forceUpdate) == "undefined" || forceUpdate == false) {
                    if (_.filter(envelope().recipients(), function (rec) { return rec.dirtyFlag().isDirty() == true }).length == 0) {
                        if (_.isFunction(sucessCallback))
                            sucessCallback();
                        return;
                    }
                }
                var $deferreds = [];
                for (var i = 0; i < envelope().recipients().length; i++) {
                    var recipient = envelope().recipients()[i];
                    if (recipient.isValid()) {
                        recipient.order(i);
                        $deferreds[i] = $.Deferred(function(def) {

                            repository.envelopeRecipient.updateRecipient({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    envelopeId: envelope().id,
                                    recipientId: recipient.id(),
                                    recipientEmail: recipient.email(),
                                    recipientFirstName: recipient.firstName(),
                                    recipientLastName: recipient.lastName(),
                                    roleId: function() {
                                        switch (recipient.roleId()) {
                                        case 1:
                                            return "58416f6827eb612fef7750b62cf2bf9a";
                                        case 2:
                                            return "693e6cee8a4a21285f86930491b455ec";
                                        default:
                                            return "6df1056f4d9a27ec34698552a6372a68";
                                        }
                                    },
                                    order: recipient.order()
                                },
                                successCallback: function (recipientResult) {
                                    recipient.dirtyFlag().reset();
                                    def.resolve(recipientResult);
                                },
                                errorCallback: function(error) {
                                    def.reject(error);
                                }
                            });
                        }).promise();
                    }
                }
                $.when.apply(null, $deferreds).then(function () {
                    if (_.isFunction(sucessCallback))
                        sucessCallback();
                });

            },
            updateEnvelopeInfo = function (callback) {
                if (envelope().dirtyFlagInfo().isDirty() == false) return;
                inprogress(true);
                repository.envelope.renameEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        name: envelope().name(),
                    },
                    doneCallback: function (renameResult) {
                        repository.envelope.updateEnvelope({
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: envelope().id(),
                                name: envelope().name(),
                                emailBody: envelope().emailBody(),
                                emailSubject: envelope().emailSubject(),
                                envelopeExpireTime: envelope().envelopeExpireTime(),
                                orderedSignature: envelope().orderedSignature(),
                                ownerShouldSign: envelope().ownerShouldSign(),
                                reminderTime: envelope().reminderTime(),
                                stepExpireTime: envelope().stepExpireTime(),
                                waterMarkText: envelope().waterMarkText(),
                                waterMarkImage: envelope().waterMarkImage(),
                                attachSignedDocument: envelope().attachSignedDocument(),
                                includeViewLink: envelope().includeViewLink(),
                                canBeCommented: envelope().canBeCommented(),
                                inPersonSign: envelope().inPersonSign(),
                                enableTypedSignature: envelope().enableTypedSignature(),
                                enableUploadedSignature: envelope().enableUploadedSignature(),
                                requireUserAuthForSign: envelope().requireUserAuthForSign(),
                                requestUserAuthByPhoto: envelope().requestUserAuthByPhoto(),
                                showRecipientCommentInSignedDocument: envelope().showRecipientCommentInSignedDocument(),
                                tags: envelope().tags()
                            },
                            doneCallback: function (envelopeResult) {
                                inprogress(false);
                                envelope().dirtyFlagInfo().reset();
                                if (_.isFunction(callback))
                                    callback();
                            },
                            errorCallback: errorCallback
                        });
                    },
                    errorCallback: errorCallback
                });
            },
            updateEnvelopeReminders = function (callback) {
                //console.log(envelope().tags());

                if (envelope().dirtyFlagReminders().isDirty() == false) return;
                inprogress(true);
                repository.envelope.updateEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        name: envelope().name(),
                        emailBody: envelope().emailBody(),
                        emailSubject: envelope().emailSubject(),
                        envelopeExpireTime: envelope().envelopeExpireTime(),
                        orderedSignature: envelope().orderedSignature(),
                        ownerShouldSign: envelope().ownerShouldSign(),
                        reminderTime: envelope().reminderTime(),
                        stepExpireTime: envelope().stepExpireTime(),
                        waterMarkText: envelope().waterMarkText(),
                        waterMarkImage: envelope().waterMarkImage(),
                        attachSignedDocument: envelope().attachSignedDocument(),
                        includeViewLink: envelope().includeViewLink(),
                        canBeCommented: envelope().canBeCommented(),
                        inPersonSign: envelope().inPersonSign(),
                        enableTypedSignature: envelope().enableTypedSignature(),
                        enableUploadedSignature: envelope().enableUploadedSignature(),
                        requireUserAuthForSign: envelope().requireUserAuthForSign(),
                        requestUserAuthByPhoto: envelope().requestUserAuthByPhoto(),
                        showRecipientCommentInSignedDocument: envelope().showRecipientCommentInSignedDocument(),
                        tags: envelope().tags()
                    },
                    doneCallback: function (envelopeResult) {
                        inprogress(false);
                        envelope().dirtyFlagReminders().reset();
                        if (_.isFunction(callback))
                            callback();
                    },
                    errorCallback: errorCallback
                });

                   
            },
            canSign = ko.computed(function () {
                if (!envelope())
                    return false;
                var signers = _.filter(envelope().recipients(), function (rec) { return rec.role() != 'CC'; });
                return signers.length == 1 && signers[0].role() == 'Owner';

            }),
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };
        
        return {
            inprogress: inprogress,
            envelope: envelope,
            documents: documents,
            loadEnvelope: loadEnvelope,
            updateEnvelope: updateEnvelope,
            sendEnvelope: sendEnvelope,
            cancelPrepare: cancelPrepare,
            loadDocuments: loadDocuments,
            updateRecipientsOrder: updateRecipientsOrder,
            updateEnvelopeInfo: updateEnvelopeInfo,
            updateEnvelopeReminders: updateEnvelopeReminders,
            sendAndSign: sendAndSign,
            canSign: canSign
        };
    });
define('core/vm/vm.envelope.prepare.step1',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            documents = ko.observableArray([]),
            parseFields = ko.observable(false),
            templates = ko.observableArray([]),
            selectedTemplate = ko.observable(),
            newName = ko.observable('').extend({ required: { message: config.validationMessages.required } }),
            loadDocuments = function (envelopeId, callback) {
                inprogress(true);
                documents.removeAll();
                repository.envelopeDocument.getDocuments({
                    documentResult: documents,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            loadTemplates = function(callback) {
                repository.template.getTemplates(
                    doneCallback = function (templateResult) {
                        inprogress(false);
                        var tmpTemplates = ko.observableArray([]);
                        _.each(templateResult, function (tpl) {
                            if (tpl.documentsCount() >0  && tpl.fieldsCount() > 0) {
                                $.extend(tpl, { selected: ko.observable(false) });
                                tmpTemplates.push(tpl);
                            }
                        });
                        templates(tmpTemplates());
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback
                );
            },
            addDocument = function (envelopeId, fileId) {
                inprogress(true);
                repository.envelopeDocument.addDocument({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId,
                        documentId: fileId,
                        parseFields: parseFields(),
                        order: 0
                    },
                    doneCallback: function(documentResult) {
                        inprogress(false);
                        documents.push(documentResult);
                    },
                    errorCallback: function(error) {
                        if (error.indexOf("document is already in the") == -1) {
                            errorCallback(error);
                            return;
                        }
                        
                        var doc = _.find(documents(), function(d) {
                            return d.documentId == fileId;
                        });
                        if (doc) {
                            errorCallback(error);
                            return;
                        }
                        inprogress(false);
                        loadDocuments(envelopeId);
                    }
                });
            },
            removeDocument = function(envelopeId, fileId) {
                inprogress(true);
                repository.envelopeDocument.removeDocument({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId,
                        documentId: fileId,
                        order: 0
                    },
                    doneCallback: function() {
                        inprogress(false);
                        documents.remove($.grep(documents(), function(a) { return a.documentId() == fileId(); })[0]);
                    },
                    errorCallback: errorCallback
                });

            },
            viewDocument = function (fileId) {
                redirect.viewDocument(fileId);
            },
            renameDocument = function (document, callback) {
                if (newName() == '')
                    return;
                repository.envelopeDocument.renameDocument(document.envelopeId(), document.documentId(), newName(),
                    function (response) {
                        document.name(response.result.document.name);
                        if (_.isFunction(callback)) {
                            callback(response);
                        }
                    },
                    errorCallback);
            },
            selectTemplate = function (template) {
                if (template.selected()) {
                    $.each(templates().filter(function (fltItem) {
                        return fltItem.selected() && fltItem.id != template.id;
                    }), function () {
                        this.selected(false);
                    });
                    selectedTemplate(template);
                }
            },
            addFromTemplate = function (envelopeId, callback) {

                if (selectedTemplate() == null) return;
                repository.envelope.updateEnvelopeFromTemplate(envelopeId, selectedTemplate().id(),
                    doneCallback = function (data) {
                        repository.envelopeDocument.getDocuments({
                            documentResult: documents,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: data.result.envelope.id
                            },
                            doneCallback: function (result) {
                                inprogress(false);
                                if (_.isFunction(callback)) {
                                    callback(result);
                                }
                            },
                            errorCallback: errorCallback
                        });
                    },
                    errorCallback
                );

            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };

        return {
            inprogress: inprogress,
            documents: documents,
            parseFields: parseFields,
            addDocument: addDocument,
            removeDocument: removeDocument,
            viewDocument: viewDocument,
            renameDocument: renameDocument,
            newName: newName,
            addFromTemplate: addFromTemplate,
            selectTemplate: selectTemplate,
            templates: templates,
            selectedTemplate: selectedTemplate,
            loadTemplates: loadTemplates
        };
    });
define('core/vm/vm.envelope.prepare.step2',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            envelope = ko.observable(),
            contacts = ko.observableArray([]),
            newRecipient = {
                firstName: ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'First name too long' } }),
                lastName: ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'Last name too long' } }),
                email: ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, email: { message: config.validationMessages.invalidEmail }, noSpaces: {} }),
                role: ko.observable(2)
            },
            addOwnerAsRecipient = function(callback) {
                inprogress(true);
                repository.envelope.updateEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        emailBody: envelope().emailBody(),
                        emailSubject: envelope().emailSubject(),
                        envelopeExpireTime: envelope().envelopeExpireTime(),
                        orderedSignature: envelope().orderedSignature(),
                        ownerShouldSign: true,
                        reminderTime: envelope().reminderTime(),
                        stepExpireTime: envelope().stepExpireTime(),
                        waterMarkText: envelope().waterMarkText(),
                        waterMarkImage: envelope().waterMarkImage(),
                        attachSignedDocument: envelope().attachSignedDocument(),
                        includeViewLink: envelope().includeViewLink(),
                        canBeCommented: envelope().canBeCommented(),
                        inPersonSign: envelope().inPersonSign(),
                        enableTypedSignature: envelope().enableTypedSignature(),
                        enableUploadedSignature: envelope().enableUploadedSignature(),
                        requireUserAuthForSign: envelope().requireUserAuthForSign(),
                        requestUserAuthByPhoto: envelope().requestUserAuthByPhoto(),
                        showRecipientCommentInSignedDocument: envelope().showRecipientCommentInSignedDocument(),
                        tags: envelope().tags()
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        envelope().ownerShouldSign(true);
                        envelope().recipients.push($.grep(result.recipients(), function (a) { return a.roleId() == 1; })[0]);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            addRecipient = function (recipient, callback) {
                if (inprogress() == true)
                    return;
                var recipientToBeAdded;
                if (recipient != null) {
                    recipientToBeAdded = recipient;
                } else {
                    recipientToBeAdded = newRecipient;
                }
                if (!recipientToBeAdded.isValid()) {
                    recipientToBeAdded.errors.showAllMessages(true);
                    return;
                }
                if (recipientToBeAdded.email() == config.userEmail()) {
                    if (envelope().ownerShouldSign()) {
                        config.alert({ title: "Error", message: "Owner already added" });
                        return;
                    }
                    addOwnerAsRecipient(function(envelopeResult) {
                        newRecipient.firstName('');
                        newRecipient.lastName('');
                        newRecipient.email('');
                        newRecipient.role(2);
                        newRecipient.errors.showAllMessages(false);
                        if (_.isFunction(callback)) {
                            callback($.grep(envelopeResult.recipients(), function (a) { return a.roleId() == 1; })[0]);
                        }
                    });
                    return;
                }
                inprogress(true);
                repository.envelopeRecipient.addRecipient({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id,
                        recipientEmail: recipientToBeAdded.email(),
                        recipientFirstName: recipientToBeAdded.firstName(),
                        recipientLastName: recipientToBeAdded.lastName(),
                        roleId: function () {
                            switch (newRecipient.role()) {
                                case 1:
                                    return "58416f6827eb612fef7750b62cf2bf9a";
                                case 2:
                                    return "693e6cee8a4a21285f86930491b455ec";
                                default:
                                    return "6df1056f4d9a27ec34698552a6372a68";
                            }
                        },
                        order: envelope().recipients().length
                    },
                    successCallback: function (recipientResult) {
                        inprogress(false);
                        envelope().recipients.push(recipientResult);
                        newRecipient.firstName('');
                        newRecipient.lastName('');
                        newRecipient.email('');
                        newRecipient.role(2);
                        newRecipient.errors.showAllMessages(false);
                        if (_.isFunction(callback)) {
                            callback(recipientResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            removeRecipient = function (recipient, callback) {
                inprogress(true);
                if (recipient.roleId() == 1) {
                    repository.envelope.updateEnvelope({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopeId: envelope().id(),
                            emailBody: envelope().emailBody(),
                            emailSubject: envelope().emailSubject(),
                            envelopeExpireTime: envelope().envelopeExpireTime(),
                            orderedSignature: envelope().orderedSignature(),
                            ownerShouldSign: false,
                            reminderTime: envelope().reminderTime(),
                            stepExpireTime: envelope().stepExpireTime(),
                            waterMarkText: envelope().waterMarkText(),
                            waterMarkImage: envelope().waterMarkImage(),
                            attachSignedDocument: envelope().attachSignedDocument(),
                            includeViewLink: envelope().includeViewLink(),
                            canBeCommented: envelope().canBeCommented(),
                            inPersonSign: envelope().inPersonSign(),
                            enableTypedSignature: envelope().enableTypedSignature(),
                            enableUploadedSignature: envelope().enableUploadedSignature(),
                            requireUserAuthForSign: envelope().requireUserAuthForSign(),
                            requestUserAuthByPhoto: envelope().requestUserAuthByPhoto(),
                            showRecipientCommentInSignedDocument: envelope().showRecipientCommentInSignedDocument(),
                            tags: envelope().tags()
                        },
                        doneCallback: function (result) {
                            inprogress(false);
                            envelope().ownerShouldSign(false);
                            envelope().recipients.remove($.grep(envelope().recipients(), function (a) { return a.roleId() == 1; })[0]);
                            if (_.isFunction(callback)) {
                                callback(result);
                            }
                        },
                        errorCallback: errorCallback
                    });
                } else {
                    repository.envelopeRecipient.removeRecipient({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopeId: envelope().id,
                            recipientId: recipient.id()
                        },
                        successCallback: function (result) {
                            inprogress(false);
                            envelope().recipients.remove($.grep(envelope().recipients(), function (a) { return a.id() == recipient.id(); })[0]);
                            if (_.isFunction(callback)) {
                                callback(result);
                            }
                        },
                        errorCallback:errorCallback
                    });
                }
            },
            updateRecipient = function (recipient, callback) {
                if (!recipient.isValid()) {
                    recipient.errors.showAllMessages(true);
                    return;
                }
                inprogress(true);
                repository.envelopeRecipient.updateRecipient({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id,
                        recipientId: recipient.id(),
                        recipientEmail: recipient.email(),
                        recipientFirstName: recipient.firstName(),
                        recipientLastName: recipient.lastName(),
                        roleId: function () {
                            switch (recipient.roleId()) {
                                case 1:
                                    return "58416f6827eb612fef7750b62cf2bf9a";
                                case 2:
                                    return "693e6cee8a4a21285f86930491b455ec";
                                default:
                                    return "6df1056f4d9a27ec34698552a6372a68";
                            }
                        },
                        order: ko.utils.arrayIndexOf(envelope().recipients(), recipient)
                    },
                    successCallback: function (recipientResult) {
                        inprogress(false);
                        recipient.errors.showAllMessages(false);
                        if (_.isFunction(callback)) {
                            callback(recipientResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            loadContacts = function (callback) {
                inprogress(true);
                repository.contact.getContacts({
                    itemsResult: contacts,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        count: 2147483647
                    },
                    doneCallback: function (contactsResult) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(contactsResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };

        ko.validation.group(newRecipient);
        
        return {
            inprogress: inprogress,
            envelope: envelope,
            contacts: contacts,
            newRecipient: newRecipient,
            addOwnerAsRecipient: addOwnerAsRecipient,
            addRecipient: addRecipient,
            removeRecipient: removeRecipient,
            updateRecipient: updateRecipient,
            loadContacts: loadContacts
        };
    });
define('core/vm/vm.envelope.prepare.step3',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            envelope = ko.observable(),
            messageInvalidSettings = "Cannot have In-person sign and Sequential signing",
            inPersonSign = ko.computed({
                read: function () {
                    if (envelope())
                        return envelope().inPersonSign();
                    else
                        return false;
                },
                write: function (value) {
                    if (value && orderedSignature())
                        config.alert({ title: "Error", message: messageInvalidSettings });
                    else
                        envelope().inPersonSign(value);
                },
                owner: this
            }),
            orderedSignature = ko.computed({
                read: function () {
                    if (envelope())
                        return envelope().orderedSignature();
                    else
                        return false;
                },
                write: function (value) {
                    if (value && inPersonSign())
                        config.alert({ title: "Error", message: messageInvalidSettings });
                    else
                        envelope().orderedSignature(value);
                },
                owner: this
            });
            
        return {
            inprogress: inprogress,
            envelope: envelope,
            inPersonSign: inPersonSign,
            orderedSignature: orderedSignature
        };
    });
define('core/vm/vm.envelope.prepare.step4',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, configuration, redirect) {
        var inprogress = ko.observable(false),
            envelope = ko.observable();

        return {
            inprogress: inprogress,
            envelope: envelope
        };
    });
define('core/vm/vm.envelope.prepare.step5',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, configuration, redirect) {
        var inprogress = ko.observable(false),
            viewerAction = 'prepare',
            config = configuration,
            envelope = ko.observable(),
            signatureFields = ko.observableArray([]),
            recipients = ko.computed(function() {
                try {
                    return ko.utils.arrayFilter(envelope().recipients(), function(recipient) {
                        return recipient.roleId() != 3;
                    });
                } catch(e) {
                    return [];
                }
            }),
            fields = ko.observableArray([]),
            documents = ko.observableArray([]),
            previewDocument = ko.observable(),
            previewRecipient = ko.observable(),
            pageWidth = ko.observable(850),
            pageHeight = ko.observable(1200),
            timer,
            cuttedLocation = ko.observable(),
            copiedLocation = ko.observable(),
            cuttedField = ko.observable(),
            copiedField = ko.observable(),
            selectedField = ko.observable(),
            selectedLocation = ko.observable(),
            predefinedLists = ko.observableArray([]),
            selectedPredefinedList = ko.observable(),
            fieldsLoaded = ko.observable(false),
            newAcceptableValue = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            newAcceptableValueListName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            regularExpressions = ko.computed(function () {
                if (selectedField()!=null && (selectedField().fieldType() == configuration.signatureFieldType.SingleLine || selectedField().fieldType() == configuration.signatureFieldType.SingleLine || selectedField().fieldType() == configuration.signatureFieldType.Date)) {
                    return configuration.fieldValidations.filter(function(item) {
                        return $.grep(item.fieldType.split(','), function (e) { return e == selectedField().fieldType(); })[0] != null;
                    });
                } else
                    return [];
            }),
            init = function(callback) {
                inprogress(true);
                repository.field.getFields({
                    itemsResult: signatureFields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey()
                    },
                    doneCallback: function(fieldsResult) {
                        repository.predefinedList.getPredefinedLists({
                            itemsResult: predefinedLists,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey()
                            },
                            doneCallback: function(listsResult) {
                                inprogress(false);
                                if (_.isFunction(callback)) {
                                    callback(fieldsResult, listsResult);
                                }
                            },
                            errorCallback:errorCallback
                        });
                    },
                    errorCallback:errorCallback
                });


            },
            isOwnField = function(field) {
                return previewRecipient() != null ? field.recipientId() == previewRecipient().id() : false;
            },
            getRecipientNameById = function(recipientId) {
                if (envelope() != null && envelope().recipients().length > 0) {
                    return $.grep(envelope().recipients(), function (r) {
                        return r.id() == recipientId;
                    })[0].fullName();
                }
                return '';
            },
            addField = function(fieldId, pageNum, relativeX, relativeY, locationHeight, locationWidth, forceNewField, fieldName) {
                inprogress(true);
                repository.envelopeField.addField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        documentId: previewDocument().documentId(),
                        recipientId: previewRecipient().id(),
                        fieldId: fieldId,
                        forceNewField: forceNewField,
                        page: pageNum,
                        locationX: relativeX,
                        locationY: relativeY,
                        locationHeight: locationHeight,
                        locationWidth: locationWidth,
                        name: fieldName,
                        pageWidth: pageWidth(),
                        pageHeight: pageHeight()
                    },
                    successCallback: function(fieldResult) {
                        inprogress(false);
                        fieldResult.locations.remove(function (item) {
                            return item.documentId() != previewDocument().documentId();
                        });
                        if (forceNewField && !_.find(fields(), function (a) { return a.id() == fieldResult.id(); })) {
                            fields.push(fieldResult);
                            var document = $.grep(documents(), function(d) { return d.documentId() == fieldResult.locations()[0].documentId(); })[0];
                            document.fieldsCount(document.fieldsCount() + 1);
                            document.fields().push(fieldResult);
                        } else {
                            $.grep(fields(), function(a) { return a.id() == fieldResult.id(); })[0].locations.push(fieldResult.locations.pop());
                        }
                        if (ownLocations().length > fieldResult.locations()[fieldResult.locations().length-1].order()) {
                            fieldsLoaded(false);
                            getDocumentFields(previewDocument().documentId());
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            ownLocations = function() {
                var locations = ko.observableArray([]);
                $.each(fields(), function () {
                    if (isOwnField(this)) {
                        $.each(this.locations(), function () {
                            locations.push(this);
                        });
                    }
                });
                return locations();
            },
            updateFieldLocation = function (location, callback) {
                if (!location) return;
                inprogress(true);
                repository.envelopeField.updateFieldLocation({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        documentId: previewDocument().documentId(),
                        recipientId: previewRecipient().id(),
                        locationId: location.id(),
                        fieldId: location.fieldId(),
                        page: location.page(),
                        locationX: location.locationX(),
                        locationY: location.locationY(),
                        locationHeight: location.locationHeight(),
                        locationWidth: location.locationWidth(),
                        fontBold: location.fontBold(),
                        fontColor: location.fontColor(),
                        fontItalic: location.fontItalic(),
                        fontName: location.fontName(),
                        fontSize: location.fontSize(),
                        fontUnderline: location.fontUnderline(),
                        align: location.align(),
                        pageWidth: pageWidth(),
                        pageHeight: pageHeight()
                    },
                    successCallback: function(fieldResult) {
                        inprogress(false);
                        location.dirtyFlag().reset();
                        var fld = _.find(fields(), function (f) {
                            return f.id() == location.fieldId();
                        });
                        if (fld && fld.recipientId() != previewRecipient().id()) {
                            inprogress(true);
                            repository.envelopeField.assignField({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    envelopeId: envelope().id(),
                                    documentId: previewDocument().documentId(),
                                    currentRecipientId: previewRecipient().id(),
                                    newRecipientId: fld.recipientId(),
                                    fieldId: location.fieldId()
                                },
                                successCallback: function(assignedFieldResult) {
                                    inprogress(false);
                                    if (_.isFunction(callback)) {
                                        callback(assignedFieldResult);
                                    }
                                },
                                errorCallback: function(error) {
                                    errorCallback(error);
                                    if (_.isFunction(callback)) {
                                        callback(false);
                                    }
                                } 
                            });
                        } else {
                            if (_.isFunction(callback)) {
                                callback(fieldResult);
                            }
                        }
                    },
                    errorCallback: function (error) {
                        inprogress(false);
                        config.alert({ title: "Error", message: error });
                        fieldsLoaded(false);
                        getDocumentFields(previewDocument().documentId());
                        if (_.isFunction(callback)) {
                            callback(false);
                        }
                    }
                });
            },
            isValidDate = function (s) {
                if (!s || s.length == 0) return true;
                if (s.length != 10) return false;
                var bits = s.split('.');
                if (!bits[0] || !bits[1] || !bits[2]) return false;
                if (bits[2] < 1900 || bits[2] > 2100) return false;
                var d = new Date(bits[2], bits[1] - 1, bits[0]);
                return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
            },
            updateField = function (field, callback) {
                if (!field) return;
                if (!field.isValid()) {
                    config.alert({ title: "Field not saved", message: 'Field data is not valid' });
                    return;
                }
                if (field.fieldType() == config.signatureFieldType.Date) {
                    if (!field.settings().minYear.isValid() || !field.settings().maxYear.isValid()) {
                        config.alert({ title: "Field not saved", message: 'Invalid date settings' });
                        return;
                    }
                }
                if (field.fieldType() > 1 && field.fieldType() < 5 && field.defaultValue() != '') {
                    if (field.regularExpression() != null && !field.defaultValue().match(field.regularExpression())) {
                        config.alert({ title: "Field not saved", message: 'Default value is not valid' });
                        return;
                    }
                    if (field.fieldType() == 4 && field.regularExpression() == "" && !isValidDate(field.defaultValue())) {
                        config.alert({ title: "Field not saved", message: 'Default date is not valid' });
                        return;
                    }
                }
                inprogress(true);
                repository.envelopeField.updateField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        documentId: previewDocument().documentId(),
                        recipientGuid: previewRecipient().id(),
                        fieldId: field.id(),
                        name: field.name(),
                        regularExpression: field.regularExpression(),
                        order: field.order(),
                        mandatory: field.mandatory(),
                        acceptableValues: field.acceptableValues(),
                        defaultValue: field.defaultValue(),
                        tooltip: field.tooltip(),
                        guidanceText: field.guidanceText(),
                        groupName: field.groupName(),
                        fieldType: field.fieldType(),
                        settings: ko.toJSON(field.settings()),
                        lockDuringSign: field.lockDuringSign()
                    },
                    successCallback: function(fieldResult) {
                        inprogress(false);
                        field.dirtyFlag().reset();
                        if (_.isFunction(callback)) {
                            callback(fieldResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            deleteFieldLocation = function(field, location) {
                inprogress(true);
                repository.envelopeField.deleteFieldLocation({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        fieldId: location.fieldId(),
                        locationId: location.id()
                    },
                    successCallback: function() {
                        inprogress(false);
                        field.locations.remove(location);
                        if (field.locations().length == 0) {
                            fields.remove(field);
                            var document = $.grep(documents(), function(d) { return d.documentId() == location.documentId(); })[0];
                            document.fieldsCount(document.fieldsCount() - 1);
                            document.fields.remove(field);
                        }
                        selectedField(null);
                        selectedLocation(null);
                    },
                    errorCallback: errorCallback
                });
            },
            updateMovedField = function(location, event) {
                if (!location.selected()) return;
                clearInterval(timer);
                timer = setTimeout(function() {
                    if (event.keyCode > -37 && event.keyCode <= 40)
                        updateFieldLocation(location);
                }, 2000);
            },
            getDocumentFields = function (documentId, callback) {
                if (fieldsLoaded()) {
                    if (_.isFunction(callback)) {
                        callback(fields());
                    }
                    return;
                }
                inprogress(true);
                fields.removeAll();
                selectedField(null);
                selectedLocation(null);
                repository.envelopeField.getFields({
                    itemsResult: fields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        envelopeId: envelope().id(),
                        documentId: documentId
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                        var document = ko.utils.arrayFirst(documents(), function (doc) {
                            return doc.documentId() === documentId;
                        });
                        document.fields.removeAll();
                        ko.utils.arrayForEach(fieldsResult, function (docField) {
                            docField.locations.remove(function (item) {
                                return item.documentId() != documentId;
                            });
                        });
                        _.map(fieldsResult, function (fld) {
                            document.fields().push(fld);
                        });
                        fieldsLoaded(true);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                        //document.fields(fieldsResult);
                    },
                    errorCallback:errorCallback
                });
            },
            getDocumentField = function (documentId, fieldId, callback) {
                inprogress(true);
                repository.envelopeField.getField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        envelopeId: envelope().id(),
                        documentId: documentId,
                        fieldId: fieldId
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                        fieldsResult.locations.remove(function (item) {
                            return item.documentId() != documentId;
                        });
                        var document = ko.utils.arrayFirst(documents(), function (doc) {
                            return doc.documentId() === documentId;
                        });
                        var field = ko.utils.arrayFirst(document.fields(), function (f) {
                            return f.id() === fieldId;
                        });
                        fields.replace(field, fieldsResult);
                        document.fields.replace(field, fieldsResult);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            copyFieldLocation = function (field, location) {
                if (location.selected()) {
                    copiedLocation(location);
                    copiedField(field);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            cutFieldLocation = function(field, location) {
                if (location.selected()) {
                    if (field == null) return;
                    cuttedLocation(location);
                    cuttedField(field);
                    copiedLocation(null);
                    copiedField(null);
                    field.locations.remove(location);
                }
            },
            pasteNewField = function() {
                if (copiedLocation() != null && copiedField() != null) {
                    var signatureCopiedField = $.grep(signatureFields(), function(a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), true, '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var signatureCuttedField = $.grep(signatureFields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX(), cuttedLocation().locationY(), cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), true, '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            pasteNewLocation = function() {
                if (copiedLocation() != null && copiedField() != null) {
                    var envelopeCopiedField = $.grep(fields(), function(a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    var signatureCopiedField = $.grep(signatureFields(), function(a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(envelopeCopiedField != null ? copiedLocation().fieldId() : signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), envelopeCopiedField != null ? false : true, envelopeCopiedField != null ? copiedField().name() : '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var envelopeCuttedField = $.grep(fields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    var signatureCuttedField = $.grep(signatureFields(), function(a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(envelopeCuttedField != null ? cuttedLocation().fieldId() : signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX() + 0.05, cuttedLocation().locationY() + 0.05, cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), envelopeCuttedField != null ? false : true, envelopeCuttedField != null ? cuttedField().name() : '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            addFieldFromMenu = function(fieldType) {
                var signatureField = $.grep(signatureFields(), function(a) { return a.fieldType() == fieldType; })[0];
                var height, width;
                switch (fieldType) {
                case 1:
                    //signature
                    height = 46;
                    width = 148;
                    break;
                case 6:
                    //checkbox
                    height = 25;
                    width = 25;
                    break;
                default:
                    height = 25;
                    width = 205;
                    break;
                }
                addField(signatureField.id(), 1, 0, 0, height, width, true, '');
            },
            selectDefaultValue = function(value) {
                if (selectedField() != null)
                    selectedField().defaultValue(value);
            },
            addAcceptableValue = function () {
                newAcceptableValue($.trim(newAcceptableValue()));
                if ($.grep(newAcceptableValue.errors(), function(error) {
                    return error != null;
                }
                ).length > 0) {
                    newAcceptableValue.errors.showAllMessages(true);
                    return;
                }
                ;
                if (selectedField() != null && newAcceptableValue() != '') {
                    if (selectedField().acceptableValuesArray().indexOf(newAcceptableValue()) > -1) {
                        config.alert({ title: "Error", message: "Value already in list" });
                        return;
                    }
                    selectedField().acceptableValuesArray.push(newAcceptableValue());
                    newAcceptableValue('');
                    selectedPredefinedList(null);
                    newAcceptableValue.errors.showAllMessages(false);
                }
            },
            deleteAcceptableValue = function(value) {
                $.confirm({
                    title: "Delete Confirmation",
                    message: "Are you sure ?",
                    buttons: {
                        Yes: {
                            action: function() {
                                selectedField().acceptableValuesArray.remove(value);
                                if (selectedField().defaultValue() == value)
                                    selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            },
            addNewAcceptableValuesList = function() {
                if ($.grep(newAcceptableValueListName.errors(), function(error) {
                    return error != null;
                }
                ).length > 0) {
                    newAcceptableValueListName.errors.showAllMessages(true);
                    return;
                }
                ;
                if (selectedField() != null && newAcceptableValueListName() != '') {
                    inprogress(true);
                    repository.predefinedList.addList({
                        itemsResult: predefinedLists,
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            name: newAcceptableValueListName(),
                            defaultValue: selectedField().defaultValue(),
                            values: selectedField().acceptableValues()
                        },
                        successCallback: function(result) {
                            inprogress(false);
                            predefinedLists.push(result);
                        },
                        errorCallback:errorCallback
                    });
                    newAcceptableValueListName('');
                    newAcceptableValueListName.errors.showAllMessages(false);
                }
            },
            deleteAcceptableValuesList = function () {
                if (selectedPredefinedList() == null) return;
                inprogress(true);
                repository.predefinedList.deleteList({
                    itemsResult: predefinedLists,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        listId: selectedPredefinedList().id()
                    },
                    successCallback: function (result) {
                        inprogress(false);
                        var selected = selectedPredefinedList();
                        selectedPredefinedList(null);
                        predefinedLists.remove(selected);
                    },
                    errorCallback: function (error) {
                        config.alert({ title: "error", message: error });
                    }
                });
            },
            resetFields = function () {
                inprogress(true);
                repository.envelopeField.getFields({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        envelopeId: envelope().id(),
                        documentId: ""
                    },
                    successCallback: function(fieldsResult) {
                        var fieldIds = [];
                        $.each(fieldsResult, function() {
                            fieldIds[fieldIds.length] = this.id();
                        });
                        if (fieldIds.length > 0) {
                            repository.envelopeField.deleteFields({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    envelopeId: envelope().id(),
                                    fieldIds: fieldIds
                                },
                                successCallback: function(result) {
                                    inprogress(false);
                                    fields.removeAll();
                                    selectedField(null);
                                    selectedLocation(null);
                                },
                                errorCallback: errorCallback
                            });
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            },
            activateNextLocation = function (callback) {
                var locations = ko.observableArray([]);
                locations(ownLocations());
                
                locations(locations.sort(function(left, right) {
                    var p1 = left.order();
                    var p2 = right.order();
                    return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                }));
                var currentLocation = ko.utils.arrayFirst(locations(), function(item) {
                    return item.id() == selectedLocation().id();
                });
                if (currentLocation != null)
                    currentLocation.selected(false);
                var nextLocation = null;
                for (var i = 1; i < fields().length; i++) {
                    nextLocation = ko.utils.arrayFirst(locations(), function(item) {
                        return item.order() == selectedLocation().order() + i;
                    });
                    if (nextLocation!=null)
                        break;
                }
                if (nextLocation==null)
                    nextLocation = locations()[0];
                if (nextLocation == null)
                    return;
                nextLocation.selected(true);
                selectedField(
                    $.grep(fields(), function (f) {
                        return f.id() == nextLocation.fieldId();
                    })[0]);
                selectedLocation(nextLocation);
                if (_.isFunction(callback)) {
                    callback(fields());
                }
            },
            activatePrevLocation = function(callback) {
                var locations = ko.observableArray([]);
                locations(ownLocations());
                locations.sort(function (left, right) {
                    var p1 = left.order();
                    var p2 = right.order();
                    return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                });
                var currentLocation = ko.utils.arrayFirst(locations(), function (item) {
                    return item.id() == selectedLocation().id();
                });
                if (currentLocation != null)
                    currentLocation.selected(false);
                var prevLocation = null;
                for (var i = 1; i < fields().length; i++) {
                    prevLocation = ko.utils.arrayFirst(locations(), function (item) {
                        return item.order() == selectedLocation().order() - i;
                    });
                    if (prevLocation != null)
                        break;
                }

                if (prevLocation == null)
                    prevLocation = locations()[locations().length - 1];
                if (prevLocation == null)
                    return;
                prevLocation.selected(true);
                selectedField(
                    $.grep(fields(), function (f) {
                        return f.id() == prevLocation.fieldId();
                    })[0]);
                selectedLocation(prevLocation);
                if (_.isFunction(callback)) {
                    callback(fields());
                }
            };
        

        selectedPredefinedList.subscribe(function (newValue) {
            if (newValue != null) {
                $.confirm({
                    title: "Apply list confirmation",
                    message: "Are you sure that you apply the selected list?",
                    buttons: {
                        Yes: {
                            action: function () {
                                selectedField().acceptableValuesArray(newValue.values());
                                selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            }
        });        
        ko.validation.group(newAcceptableValue);
        ko.validation.group(newAcceptableValueListName);

        return {
            inprogress: inprogress,
            viewerAction: viewerAction,
            config: config,
            regularExpressions: regularExpressions,
            envelope: envelope,
            signatureFields: signatureFields,
            fields: fields,
            documents: documents,
            previewDocument: previewDocument,
            previewRecipient: previewRecipient,
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            cuttedLocation: cuttedLocation,
            copiedLocation: copiedLocation,
            cuttedField: cuttedField,
            copiedField: copiedField,
            selectedField: selectedField,
            selectedLocation: selectedLocation,
            predefinedLists: predefinedLists,
            selectedPredefinedList: selectedPredefinedList,
            newAcceptableValue: newAcceptableValue,
            newAcceptableValueListName: newAcceptableValueListName,
            init: init,
            isOwnField: isOwnField,
            addField: addField,
            updateFieldLocation: updateFieldLocation,
            updateField: updateField,
            deleteFieldLocation: deleteFieldLocation,
            updateMovedField: updateMovedField,
            getDocumentFields: getDocumentFields,
            getDocumentField: getDocumentField,
            copyFieldLocation: copyFieldLocation,
            cutFieldLocation: cutFieldLocation,
            pasteNewField: pasteNewField,
            pasteNewLocation: pasteNewLocation,
            addFieldFromMenu: addFieldFromMenu,
            selectDefaultValue: selectDefaultValue,
            addAcceptableValue: addAcceptableValue,
            deleteAcceptableValue: deleteAcceptableValue,
            addNewAcceptableValuesList: addNewAcceptableValuesList,
            resetFields: resetFields,
            getRecipientNameById: getRecipientNameById,
            recipients: recipients,
            fieldsLoaded: fieldsLoaded,
            deleteAcceptableValuesList: deleteAcceptableValuesList,
            activateNextLocation: activateNextLocation,
            activatePrevLocation: activatePrevLocation
        };
    });
define('core/vm/vm.envelope.prepare.step6',
    ['ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function (ko, _, repository, configuration, redirect) {
        var inprogress = ko.observable(false),
            envelope = ko.observable(),
            documents = ko.observableArray([]),
            fields = ko.observableArray([]),
            loadFields = function(callback) {
                if (inprogress()) return;
                inprogress(true);
                fields.removeAll();
                repository.envelopeField.getFields({
                    itemsResult: fields,
                    param: {
                        userId: configuration.userId(),
                        privateKey: configuration.privateKey(),
                        recipientId: "",
                        envelopeId: envelope().id(),
                        documentId: ""
                    },
                    successCallback: function(fieldsResult) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            getOrderedLocationsList = function(recipient, document) {
                var locations = ko.observableArray([]);
                ko.utils.arrayForEach(fields(), function(field) {
                    if (field.recipientId() == recipient.id()) {
                        ko.utils.arrayForEach(field.locations(), function(location) {
                            if (location.documentId() == document.documentId()) {
                                locations.push({
                                    location: location,
                                    fieldId: field.id(),
                                    name: field.name(),
                                    order: location.order(),
                                    fieldTypeText: field.fieldTypeText()
                                });
                            }
                        });
                    }
                });
                return locations.sort(function (left, right) {
                    var p1 = left.order;
                    var p2 = right.order;
                    return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                });;
            },
            getFields = function (recipient, document) {
                return ko.utils.arrayFilter(fields(), function(item) {
                    return $.grep(item.locations(), function(location) {
                        return location.documentId() == document.documentId();
                    }).length > 0 && item.recipientId() == recipient.id();
                });
            },
            updateFieldLocationOrder = function(item, order) {
                inprogress(true);
                var field = ko.utils.arrayFirst(fields(), function (f) {
                    return f.id()==item.location.fieldId();
                });
                repository.envelopeField.updateFieldLocationOrder({
                    param: {
                        userId: configuration.userId(),
                        privateKey: configuration.privateKey(),
                        envelopeId: envelope().id(),
                        documentId: item.location.documentId(),
                        recipientId: field.recipientId(),
                        locationId: item.location.id(),
                        fieldId: item.location.fieldId(),
                        order: order+1
                    },
                    successCallback: function (fieldResult) {
                        inprogress(false);
                    },
                    errorCallback: errorCallback
                });
            },
            canSign = function () { },
            errorCallback = function (error) {
                inprogress(false);
                configuration.alert({ title: "Error", message: error });
                return false;
            };

        return {
            inprogress: inprogress,
            envelope: envelope,
            documents: documents,
            fields: fields,
            loadFields: loadFields,
            getFields: getFields,
            canSign: canSign,
            updateFieldLocationOrder: updateFieldLocationOrder,
            getOrderedLocationsList: getOrderedLocationsList
        };
    });
define('core/vm/vm.envelope.sign',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect',
        'core/eventManager'],
    function ($, ko, _, repository, configuration, redirect, event) {
        var viewerAction = 'sign',
            config = configuration,
            eventManager = new event({
                envelopeFieldFilledCallback: function (data) {
                    var fieldData = JSON.parse(data.data);
                    var field = ko.utils.arrayFirst(fields(), function (item) {
                        return item.id() == fieldData.fieldId;
                    });
                    field.progress(data.percent);
                }
            }),
            isPublic = ko.observable(false),
            recipientId = ko.observable(),
            inprogress = ko.observable(false),
            envelope = ko.observable(),
            documents = ko.observableArray([]),
            signDocument = ko.observable(),
            fields = ko.observableArray([]),
            locations = ko.observableArray([]),
            hideStartButton = ko.observable(false),
            pageWidth = ko.observable(8350),
            pageHeight = ko.observable(1200),
            signatureFields = ko.observableArray([]),
            recipientStatus = ko.computed(function() {
                try {
                    return $.grep(envelope().recipients(), function(r) {
                        return r.id() == recipientId();
                    })[0].status();
                } catch(e) {
                    return 0;
                }
            }),
            isOwnField = function (field) {
                if (recipientId() != null) {
                    return field.recipientId() == recipientId();
                }
                return false;
            },
            getRecipientNameById = function(recipientId) {
                if (envelope() != null && envelope().recipients().length > 0) {
                    return $.grep(envelope().recipients(), function(r) {
                        return r.id() == recipientId;
                    })[0].fullName();
                }
                return '';
            },
            loadEnvelope = function(envelopeId, callback) {
                inprogress(true);
                repository.envelope.getEnvelope({
                    isPublic: isPublic(),
                    itemsResult: envelope,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId,
                        recipientId: recipientId()
                    },
                    doneCallback: function (envelopeResult) {    
                        repository.envelopeDocument.getDocuments({
                            isPublic: isPublic(),
                            documentResult: documents,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                envelopeId: envelopeId,
                                recipientId: recipientId()
                            },
                            doneCallback: function(documentResult) {
                                inprogress(false);
                                if (envelopeResult().inPersonSign() == true && recipientStatus() == 4) {
                                    var recipientsLeft = $.grep(envelope().recipients(), function (r) {
                                        return r.status() == 1;
                                    });
                                    //console.log(recipientsLeft);
                                    if (recipientsLeft.length == 0)
                                        redirect.embedEnvelopeSigned(envelope().id(), recipientId());
                                    else
                                        recipientId(recipientsLeft[0].id());
                                }
                                if (_.isFunction(callback)) {
                                    callback(envelopeResult, documentResult);
                                }
                            },
                            errorCallback:errorCallback
                        });
                    },
                    errorCallback:errorCallback
                });
            },
            getDocumentFields = function(documentId, callback) {
                inprogress(true);
                fields.removeAll();
                locations.removeAll();
                var fieldLocations = [];
                repository.envelopeField.getFields({
                    isPublic: isPublic(),
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        envelopeId: envelope().id(),
                        //documentId: documentId
                    },
                    successCallback: function(fieldsResult) {
                        inprogress(false);
                        ko.utils.arrayForEach(fieldsResult, function (docField) {
                            docField.locations.remove(function (item) {
                                return item.documentId() != documentId;
                            });
                        });
                        var needSignatureFields = false;
                        $.each(fieldsResult, function() {
                            var item = this;
                            var validators = {};
                            if (item.fieldType() != configuration.signatureFieldType.Date) {
                                if (item.regularExpression() != null && item.regularExpression() != '') {
                                    var errorMessage = $.grep(config.fieldValidations, function (r) { return r.expression == item.regularExpression(); })[0].errorMessage;
                                    validators.pattern = { params: item.regularExpression(), message: errorMessage };
                                }
                            }
                            var groupMandatory = false;
                            if (item.fieldType() == configuration.signatureFieldType.Checkbox && item.groupName() != "") {
                                groupMandatory = _.filter(fieldsResult, function (fld) {
                                    return fld.recipientId() == item.recipientId() && fld.groupName() == item.groupName() && item.mandatory()
                                            && fld.locations && fld.locations()[0] && fld.locations()[0].documentId() == signDocument().documentId();
                                }).length > 0;
                            }
                            if (item.mandatory() || groupMandatory) {
                                validators.required = { message: '' };
                                if (item.fieldType() == configuration.signatureFieldType.Checkbox)
                                    validators.validation = {
                                        validator: function (val) {
                                            if (item.groupName() != '') {
                                                var checkedGroupFields = _.filter(fields(), function (fld) {
                                                    return fld.recipientId() == item.recipientId() &&  fld.groupName() == item.groupName() && fld.data() == 'on';
                                                });
                                                return checkedGroupFields.length > 0;
                                            }
                                            else
                                                return val && val == 'on';
                                        }
                                    };
                            }
                            if ((item.data() == null || item.data() == '') &&   item.defaultValue()!=null && item.defaultValue()!='' && item.recipientId()==recipientId()) {
                                item.data(item.defaultValue());
                                if (item.locations().length>0)
                                    fillField(item, item.locations()[0]);
                            }
                            ko.utils.arrayForEach(item.locations(), function (location) {
                                if (!item.lockDuringSign()) needSignatureFields = true;
                                $.extend(location, { locked: ko.observable(item.lockDuringSign()) });
                            });
                            item.data.extend(validators);
                            item.dirtyFlag = new ko.DirtyFlag([item.data]);
                            fields.push(item);
                            if (isOwnField(item)) {
                                $.each(item.locations(), function() {
                                    fieldLocations.push(this);
                                });
                            }
                        });
                        if (fieldLocations.length > 0) {
                            /*
                            fieldLocations.sort(function (left, right) {
                                var pageHeight = 1105;
                                var pageWidth = 854;
                                var pageSize = pageHeight * pageWidth;
                                var p1 = left.page() * pageHeight*pageSize + left.locationY() * pageWidth + left.locationX();
                                var p2 = right.page() * pageHeight*pageSize + right.locationY() * pageWidth + right.locationX();
                                return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                            });
                            */
                            fieldLocations.sort(function (left, right) {
                                var p1 = left.order();
                                var p2 = right.order();
                                return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                            });
                            locations(fieldLocations);
                            activateLocation(locations()[0]);
                            if (_.isFunction(callback)) {
                                callback(fieldsResult);
                            }
                        }
                        if (signatureFields().length == 0 && needSignatureFields) {
                            repository.field.getFields({
                                isPublic: isPublic(),
                                itemsResult: signatureFields,
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey()
                                },
                                doneCallback: function() {},
                                errocCallback: errorCallback
                            });
                        }

                    },
                    errorCallback:errorCallback
                });
            },
            fillField = function(field, location) {
                if (field.data() == null) return;
                inprogress(true);
                repository.envelopeField.fillField({
                    isPublic: isPublic(),
                    itemsResult: fields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: field.envelopeId(),
                        documentId: location.documentId(),
                        recipientId: field.recipientId(),
                        fieldId: field.id(),
                        data: field.data(),
                        //signatureId: signatureId
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                    },
                    errorCallback: function (error) {
                        field.data('');
                        errorCallback(error);
                    }
                });
            },
            signEnvelope = function (data) {
                inprogress(true);
                repository.envelope.signEnvelope({
                    isPublic: isPublic(),
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        recipientId: recipientId(),
                        authData: data.authData,
                        comment: data.comment
                    },
                    successCallback: function(result) {
                        inprogress(false);
                        if (!isPublic())
                            redirect.envelopeSigned(envelope().id());
                        else {
                            //console.log('signed');
                            if (!envelope().inPersonSign())
                                redirect.embedEnvelopeSigned(envelope().id(), recipientId());
                            else {
                                $.grep(envelope().recipients(), function(r) {
                                    return r.id() == recipientId();
                                })[0].status(4);
                                var recipientsLeft = $.grep(envelope().recipients(), function(r) {
                                    return r.status() == 1;
                                });
                                //console.log(recipientsLeft);
                                if (recipientsLeft.length == 0)
                                    redirect.embedEnvelopeSigned(envelope().id(), recipientId());
                                else
                                    recipientId(recipientsLeft[0].id());
                            }
                        }
                    },
                    errorCallback:function(error) {
                        errorCallback(error, function() {
                            window.location.reload();
                        });
                    }
                });
            },
            getActiveLocation = function() {
                return _.find(locations(), function(item) { return item.selected(); });
            },
            getActiveField = function () {
                var location = getActiveLocation();
                return _.find(fields(), function (item) { return item.id()==location.fieldId(); });
            },
            activateNextLocation = function() {
                var selectedLocation = getActiveLocation();
                if (selectedLocation != null) {
                    var selectedLocationIndex = locations.indexOf(selectedLocation);
                    var nextLocationIndex;
                    if (locations().length > selectedLocationIndex + 1) {
                        nextLocationIndex = selectedLocationIndex + 1;
                    } else {
                        nextLocationIndex = 0;
                    }
                    activateLocation(locations()[nextLocationIndex]);
                } else {
                    if (locations().length > 0) {
                        activateLocation(locations()[0]);
                    }
                }
                hideStartButton(true);
            },
            activatePrevLocation = function() {
                var selectedLocation = getActiveLocation();
                if (selectedLocation != null) {
                    var selectedLocationIndex = locations.indexOf(selectedLocation);
                    var prevLocationIndex;
                    if (selectedLocationIndex > 0) {
                        prevLocationIndex = selectedLocationIndex - 1;
                    } else {
                        prevLocationIndex = locations().length - 1;
                    }
                    activateLocation(locations()[prevLocationIndex]);
                }
                hideStartButton(true);
            },
            fieldsToBeFilled = function () {
                if (!fields() || fields().length == 0)
                    return -1;
                var invalidFields = 0;
                $.each(fields(), function () {
                    if (isOwnField(this)) {
                        if (!this.isValid()) {
                            invalidFields++;
                        }
                    }
                });
                return invalidFields;
            },
            hasPrevLocation = function() {
                return locations.indexOf(getActiveLocation()) == 0;
            },
            hasNextLocation = function() {
                return locations.indexOf(getActiveLocation()) < locations().length - 1;
            },
            activateLocation = function (location) {
                $.each(locations(), function () { this.selected(false); });
                if (location == null) return;
                location.selected(true);
                hideStartButton(true);
            },
            activateFirstInvalidLocation = function () {
                var field;
                $.each(fields(), function () {
                    if (isOwnField(this)) {
                        if (!this.isValid()) {
                            field = this;
                            return false;
                        }
                    }
                });
                if (field != null)
                    activateLocation(field.locations()[0]);
            },
            fileUploaded = function (field, location, evt) {
                if (config.checkFileApiSupport()) {
                    var frField = new FileReader();
                    frField.onload = function(e) {
                        field.data(JSON.stringify({
                            size: evt.target.files[0].size,
                            type: evt.target.files[0].type,
                            name: evt.target.files[0].name,
                            data: e.target.result
                        }));
                        fillField(field, location);
                    };
                    frField.readAsDataURL(evt.target.files[0]);
                } else {
                    requirejs(['lib/fileApi/FileAPI'], function () {
                        var files = FileAPI.getFiles(evt);
                        FileAPI.readAsDataURL(files[0], function (dataUrlObject) {
                            if (dataUrlObject.type == 'load') {
                                field.data(JSON.stringify({
                                    size: files[0].size,
                                    type: files[0].type,
                                    name: files[0].name,
                                    data: dataUrlObject.result
                                }));
                                fillField(field, location);
                            }
                        });
                    });
                }
            },
            updateFieldLocation = function (location) {
                if (!location) return;
                inprogress(true);
                repository.envelopeField.updateFieldLocation({
                    isPublic: isPublic(),
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope().id(),
                        documentId: signDocument().documentId(),
                        recipientId: recipientId(),
                        locationId: location.id(),
                        fieldId: location.fieldId(),
                        page: location.page(),
                        locationX: location.locationX(),
                        locationY: location.locationY(),
                        locationHeight: location.locationHeight(),
                        locationWidth: location.locationWidth(),
                        fontBold: location.fontBold(),
                        fontColor: location.fontColor(),
                        fontItalic: location.fontItalic(),
                        fontName: location.fontName(),
                        fontSize: location.fontSize(),
                        fontUnderline: location.fontUnderline(),
                        align: location.align(),
                        pageWidth: pageWidth(),
                        pageHeight: pageHeight()
                    },
                    successCallback: function (fieldResult) {
                        inprogress(false);
                        location.dirtyFlag().reset();
                    },
                    errorCallback: function (error) {
                        inprogress(false);
                        config.alert({ title: "Error", message: error });
                    }
                });
            },
            errorCallback = function (error, closeCallback) {
                config.alert({ title: "Error", message: error, closeCallback: closeCallback });
                return false;
            };
        
        return {
            viewerAction: viewerAction,
            config: config,
            isPublic: isPublic,
            recipientId: recipientId,
            inprogress: inprogress,
            envelope: envelope,
            loadEnvelope: loadEnvelope,
            documents: documents,
            signDocument: signDocument,
            fields: fields,
            recipientStatus: recipientStatus,
            isOwnField: isOwnField,
            getDocumentFields: getDocumentFields,
            fillField: fillField,
            signEnvelope: signEnvelope,
            locations: locations,
            activateNextLocation: activateNextLocation,
            activatePrevLocation: activatePrevLocation,
            getRecipientNameById: getRecipientNameById,
            fieldsToBeFilled: fieldsToBeFilled,
            hasPrevLocation: hasPrevLocation,
            hasNextLocation: hasNextLocation,
            getActiveLocation: getActiveLocation,
            activateLocation: activateLocation,
            activateFirstInvalidLocation: activateFirstInvalidLocation,
            hideStartButton: hideStartButton,
            getActiveField: getActiveField,
            fileUploaded: fileUploaded,
            updateFieldLocation: updateFieldLocation,
            signatureFields: signatureFields
        };
    });
define('core/vm/vm.envelope.signed',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect',
        'core/routes'],
    function ($, ko, _, repository, configuration, redirect, routes) {
        var viewerAction = 'signed',
            config = configuration,
            isPublic = ko.observable(false),
            recipientId = ko.observable(),
            inprogress = ko.observable(false),
            envelopeId = ko.observable(),
            documents = ko.observableArray([]),
            signDocument = ko.observable(),
            envelopeStatus = ko.observable(-1),
            loadDocuments = function(callback) {
                inprogress(true);
                repository.envelopeDocument.getDocuments({
                    isPublic: isPublic(),
                    documentResult: documents,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId(),
                        recipientId: recipientId()
                    },
                    doneCallback: function(documentResult) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(documentResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            getDownloadUrl = function() {
                if (isPublic()) {
                    return routes.publicDownloadEnvelopeDocumentsUrl(envelopeId(), recipientId());
                } else {
                    return routes.downloadEnvelopeDocumentsUrl(config.userId(), config.privateKey(), envelopeId());
                }
            },
            getEnvelopeStatus = function(callback, failedCallback) {
                inprogress(true);
                repository.envelope.getStatus({
                    isPublic: isPublic(),
                    documentResult: documents,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelopeId(),
                        recipientId: recipientId()
                    },
                    doneCallback: function (status) {
                        envelopeStatus(status.result);
                        if (status.result == 99) {
                            setTimeout(function () {
                                getEnvelopeStatus(callback);
                            }, 2000);
                        }
                        else if (status.result == 4) {
                            inprogress(false);
                            if (_.isFunction(failedCallback)) {
                                failedCallback();
                            }
                        } else {
                            inprogress(false);
                            if (_.isFunction(callback)) {
                                callback(status);
                            }
                        }                        
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                return false;
            };

        return {
            viewerAction: viewerAction,
            config: config,
            isPublic: isPublic,
            recipientId: recipientId,
            inprogress: inprogress,
            envelopeId: envelopeId,
            loadDocuments: loadDocuments,
            documents: documents,
            signDocument: signDocument,
            getDownloadUrl: getDownloadUrl,
            getEnvelopeStatus: getEnvelopeStatus,
            envelopeStatus: envelopeStatus
        };
    });
define('core/vm/vm.envelopes',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function($, ko, _, repository, config, redirect) {
        var envelopes = ko.observableArray([]),
            inprogress = ko.observable(false),
            totalCount = ko.observable(10),
            statusId = ko.observable('-6'),
            page = ko.observable(1),
            itemsPerPage = ko.observable(1000),
            documentId = ko.observable(''),
            recipientEmail = ko.observable(''),
            date = ko.observable(''),
            name = ko.observable(''),
            tag = ko.observable(''),
            anySelected = ko.computed(function () {
                return $.grep(envelopes(), function(envelope) {
                    return envelope.selected() == true;
                }).length > 0;
            }),
            allSelected = ko.computed(function () {
                return $.grep(envelopes(), function (envelope) {
                    return envelope.selected() == true;
                }).length == envelopes().length;
            }),
            checkAccessRights = function (envelope) {
                if (envelope.inPersonSign() == true && envelope.ownerGuid() == config.userId())
                    return true;
                var hasAccess = false;
                $.each(envelope.recipients(), function() {
                    var recipient = this;
                    if (recipient.userGuid() == config.userId() || recipient.email() == config.userEmail()) {
                        hasAccess = true;
                    }
                });
                return hasAccess;
            },
            checkIfRecipientIsCC = function (envelope) {
                var hasAccess = false;
                $.each(envelope.recipients(), function () {
                    var recipient = this;
                    if ((recipient.userGuid() == config.userId() || recipient.email() == config.userEmail()) && recipient.roleId()==3 ) {
                        hasAccess = true;
                    }
                });
                return hasAccess;
            },
            checkIfRecipientIsOwner = function (envelope) {
                var hasAccess = false;
                $.each(envelope.recipients(), function () {
                    var recipient = this;
                    if ((recipient.userGuid() == config.userId() || recipient.email() == config.userEmail()) && recipient.roleId() == 1) {
                        hasAccess = true;
                    }
                });
                return hasAccess;
            },
            statusText = function (envelope) {
                var currentRecipient = $.grep(envelope.recipients(), function (r) {
                    return r.userGuid() == config.userId();
                })[0];
                switch (envelope.status()) {
                    case -1:
                        return "Draft";
                    case 0:
                        return "Annotation";
                    case 1:
                        if (currentRecipient != null) {
                            switch (currentRecipient.status()) {
                                case 1:
                                    return "Sign";
                                case 2:
                                    return "You delegated";
                                case 3:
                                    return "You rejected";
                                case 4:
                                    return "You already signed";
                                default:
                                    return "Pending";
                            }
                        }
                        else 
                            return "Pending";
                    case 2:
                        return "Expired";
                    case 3:
                        return "Canceled";
                    case 4:
                        return "Failed";
                    case 5:
                        return "Completed";
                    case 6:
                        return "Archived";
                    case 99:
                        return "Scheduled";
                }
                return "";
            },
            errorHandler = function (value) {
                if (value == "") return;
                inprogress(false);
                config.alert({ title: "Notification", message: value });
            },
            loadEnvelopes = function (options, callback) {
                if (inprogress()) return;

                if (options != null && options.clearAll != null && options.clearAll) {
                    envelopes.removeAll();
                    totalCount(0);
                }
                if (options != null && options.page != null)
                    page(options.page);
                if (options != null && options.recipientEmail != null)
                    recipientEmail(options.recipientEmail);
                if (options != null && options.documentId != null)
                    documentId(options.documentId);
                if (options != null && options.date != null)
                    date(options.date);
                if (options != null && options.statusId != null)
                    statusId(options.statusId);
                if (options != null && options.name != null)
                    name(options.name);
                if (options != null && options.tag != null)
                    tag(options.tag);
                inprogress(true);
                repository.envelope.getEnvelopes({
                    forceRefresh: true,
                    itemsResult: envelopes,
                    itemsCount: totalCount,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        statusId: statusId(),
                        page: page(),
                        count: itemsPerPage(),
                        documentId: documentId(),
                        recipientEmail: recipientEmail(),
                        date: date(),
                        name: name(),
                        tag: tag()
                    },
                    doneCallback: function() {
                        inprogress(false);
                        resizeElements();
                    },
                    errorCallback: errorHandler
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            openEnvelope = function (envelope) {
                if (envelope.status() == -1) { //draft
                    redirect.envelopeView(envelope.id());
                }
                else if (envelope.status() == 99) {
                    config.alert({ title: "Notification", message: "Please wait until document is processed" });
                }
                else if (envelope.status() == 2 ) {
                    config.alert({ title: "Error", message: "This envelope has been expired" });
                }
                else if (envelope.status() == 3 ) {
                    config.alert({ title: "Error", message: "This envelope is canceled" });
                }
                else if (envelope.status() == 4) {
                    config.alert({ title: "Error", message: "This envelope has failed" });
                }
                else if (envelope.status() == 1) { //inprogress
                    if (!checkIfRecipientIsCC(envelope)) {
                        if (checkAccessRights(envelope)) {
                            repository.envelope.envelopeRecipientSigned({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    envelopeId: envelope.id(),
                                    recipientId: config.userId()
                                },
                                doneCallback: function(result) {
                                    if (!result.signed) {
                                        if (envelope.inPersonSign()) {
                                            if (envelope.ownerGuid() == config.userId())
                                                redirect.embedEnvelopeSign(envelope.id(), envelope.recipients()[0].id());
                                        } else {
                                            if (!envelope.orderedSignature()) {
                                                redirect.envelopeSign(envelope.id());
                                            } else {
                                                repository.envelope.getEnvelopeCurrentRecipientId({
                                                    param: {
                                                        userId: config.userId(),
                                                        privateKey: config.privateKey(),
                                                        envelopeId: envelope.id()
                                                    },
                                                    doneCallback: function(recipientId) {
                                                        if (recipientId == config.userId() && checkAccessRights(envelope)) {
                                                            redirect.envelopeSign(envelope.id());
                                                        } else {
                                                            config.alert("error", "please wait your turn");
                                                        }
                                                    },
                                                    errorCallback: errorHandler
                                                });
                                            }
                                        }
                                    } else {
                                        config.alert("error", "The envelope is not signed by all recipients yet.");
                                        //redirect.envelopeSigned(envelope.id());
                                    }
                                },
                                errorCallback: errorHandler
                            });
                        } else {
                            config.alert({ title: "Notification", message: "The envelope is not signed yet" });
                        }
                    }
                } else {
                    redirect.envelopeSigned(envelope.id());
                }
            },
            restartEnvelope = function(envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.restartEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope.id()
                    },
                    doneCallback: function () {
                        inprogress(false);
                        loadEnvelopes({ clearAll: true, page: 1 });
                    },
                    errorCallback: errorHandler
                });
            },
            archiveEnvelope = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.archiveEnvelopes({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeIds: [envelope.id()]
                    },
                    doneCallback: function () {
                        inprogress(false);
                        loadEnvelopes({ clearAll: true, page: 1 });
                    },
                    errorCallback: errorHandler
                });
            },
            createEnvelope = function() {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.createEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New envelope"
                    },
                    doneCallback: function (result) {
                        //inprogress(false);
                        redirect.envelopeView(result.envelope.id);
                    },
                    errorCallback: errorHandler
                });
            },
            createEnvelopeFromDocument = function (documents) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.createEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New envelope"
                    },
                    doneCallback: function (envelopeResult) {
                        inprogress(false);
                        var $deferreds = [];
                        for (var i = 0; i < documents.length; i++) {
                            $deferreds[i] = $.Deferred(function(def) {
                                repository.envelopeDocument.addDocument({
                                    param: {
                                        userId: config.userId(),
                                        privateKey: config.privateKey(),
                                        envelopeId: envelopeResult.envelope.id,
                                        documentId: documents[i],
                                        parseFields: false,
                                        order: 0
                                    },
                                    doneCallback: function(documentResult) {
                                        def.resolve(documentResult);
                                    },
                                    errorCallback: function (error) {
                                        def.reject(error);
                                    }
                                });
                            }).promise();
                        }
                        $.when.apply(null, $deferreds).then(function () {
                            redirect.envelopeView(envelopeResult.envelope.id);
                        });
                    },
                    errorCallback: errorHandler
                });
            },
            deleteEnvelope = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.deleteEnvelopes({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopesIds: [envelope.id()]
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        envelopes.remove(envelope);
                    },
                    errorCallback: errorHandler
                });
            },
            deleteSelectedEnvelopes = function () {
                if (inprogress()) return;
                var items = [];
                var ignoredItems = 0;
                $.each(envelopes(), function() {
                    var status = this.status();
                    if (this.selected() ){ 
                        if (status == -1 || status == 2 || status == 3 || status == 4 || status == 6) {
                            items[items.length] = this.id();
                        } else {
                            ignoredItems++;
                        }
                    }
                });
                if (ignoredItems > 0) {
                    setTimeout(function() {
                        config.alert({ title: "Notification", message: ignoredItems + " "+ (ignoredItems == 1 ? "item was" : "items were") + " not processed, the status doesn't allow deleting" });
                    },100);
                }
                        
                if (items.length > 0) {
                    inprogress(true);
                    repository.envelope.deleteEnvelopes({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopesIds: items
                        },
                        doneCallback: function (result) {
                            inprogress(false);
                            _.each(items, function (e) {
                                var con = ko.utils.arrayFirst(envelopes(), function (envelope) {
                                    return envelope.id() == e;
                                });
                                envelopes.remove(con);
                            });
                        },
                        errorCallback: errorHandler
                    });
                }

            },
            archiveSelectedEnvelopes = function () {
                if (inprogress()) return;
                var items = [];
                var ignoredItems = 0;
                $.each(envelopes(), function () {
                    if (this.selected() )
                    {
                        if(this.status() == 5){
                            items[items.length] = this.id();
                        } else {
                            ignoredItems++;
                        }
                    }
                });
                
                if (ignoredItems > 0) {
                    setTimeout(function () {
                        config.alert({ title: "Notification", message: ignoredItems + " " + (ignoredItems == 1 ? "item was" : "items were") + " not processed, the status doesn't allow archiving" });
                    }, 100);
                }
                if (items.length > 0) {
                    inprogress(true);
                    repository.envelope.archiveEnvelopes({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopeIds: items
                        },
                        doneCallback: function (result) {
                            inprogress(false);
                            loadEnvelopes({ page: 1, clearAll: true });
                        },
                        errorCallback: errorHandler
                    });
                }
            },
            copyEnvelope = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.createEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: envelope.id(),
                        name: "New envelope"
                    },
                    doneCallback: function (result) {
                        redirect.envelopeView(result.envelope.id);
                    },
                    errorCallback: errorHandler
                });
            },
            resendEmailNotification = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.resendEmailNotification({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope.id()
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                    },
                    errorCallback: errorHandler
                });
            }, checkAll = function () {
                var newValue = !allSelected();
                _.each(envelopes(), function(envelope) {
                    envelope.selected(newValue);
                });
            },
            createTemplate = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.template.createTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: envelope.id(),
                        name: "New template"
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        redirect.templateView(result.template.id);
                    },
                    errorCallback: errorHandler
                });
            },
            cancelEnvelope = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.cancelEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope.id()
                    },
                    doneCallback: function () {
                        inprogress(false);
                        loadEnvelopes({ clearAll: true, page: 1 });
                    },
                    errorCallback: errorHandler
                });
            },
            retrySignEnvelope = function (envelope) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.retrySignEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeId: envelope.id()
                    },
                    doneCallback: function () {
                        inprogress(false);
                    },
                    errorCallback: errorHandler
                });
            },
            loadEnvelopeDocuments = function (envelope, callback) {
                if (envelope.documentNames() == '') {
                    repository.envelopeDocument.getDocuments({
                        isPublic: false,
                        documentResult: ko.observableArray(),
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopeId: envelope.id()
                        },
                        doneCallback: function(documentResult) {
                            var names = [];
                            ko.utils.arrayForEach(documentResult(), function (item) {
                                if (item.name()!='')
                                    names.push(item.name());
                            });
                            if (names.length>0)
                                envelope.documentNames("Document(s): " + names.join(', '));
                            if (_.isFunction(callback)) {
                                callback();
                            }
                        },
                        errorCallback: errorHandler
                    });
                }
            },
            init = function () {

            };


        ko.bindingHandlers.timeAgo = {
            update: function(element, valueAccessor, allBindingsAccessor) {
                $(element).timeago();
            }
        };
            

        init();

        return {
            inprogress: inprogress,
            loadEnvelopes: loadEnvelopes,
            openEnvelope: openEnvelope,
            restartEnvelope: restartEnvelope,
            archiveEnvelope: archiveEnvelope,
            createEnvelope: createEnvelope,
            createEnvelopeFromDocument: createEnvelopeFromDocument,
            deleteEnvelope: deleteEnvelope,
            envelopes: envelopes,
            totalCount: totalCount,
            itemsPerPage: itemsPerPage,
            page: page,
            statusId: statusId,
            anySelected: anySelected,
            allSelected: allSelected,
            checkAll: checkAll,
            statusText: statusText,
            deleteSelectedEnvelopes: deleteSelectedEnvelopes,
            archiveSelectedEnvelopes: archiveSelectedEnvelopes,
            copyEnvelope: copyEnvelope,
            createTemplate: createTemplate,
            checkIfRecipientIsOwner: checkIfRecipientIsOwner,
            cancelEnvelope: cancelEnvelope,
            retrySignEnvelope: retrySignEnvelope,
            resendEmailNotification: resendEmailNotification,
            loadEnvelopeDocuments: loadEnvelopeDocuments
        };
    });
define('core/vm/vm.envelopes.resources',
    ['ko', 'lib/underscore', 'core/repository', 'core/config'],
    function(ko, _, repository, config) {
        var inprogress = ko.observable(false),
            dashboardInprogress = ko.observable(false),
            resources = ko.observableArray([]),
            statusId = ko.observable(),
            selectedDocument = ko.observable(),
            selectedDate = ko.observable(),
            selectedRecipient = ko.observable(),
            selectedStatus = ko.observable(),
            selectedTag = ko.observable(),
            loadResources = function(callback) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelopeResource.getResources({
                    resourcesResult: resources,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        statusIds: statusId()
                    },
                    doneCallback: function() {
                        inprogress(false);
                    }
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            }, 
            init = function() {
                
            };
        return {
            inprogress: inprogress,
            loadResources: loadResources,
            resources: resources,
            statusId: statusId,
            selectedDocument: selectedDocument,
            selectedDate: selectedDate,
            selectedRecipient: selectedRecipient,
            selectedStatus: selectedStatus,
            dashboardInprogress: dashboardInprogress,
            selectedTag: selectedTag
        };
    });
define('core/vm/vm.error',
    ['jquery',
        'ko'
    ],
    function ($, ko) {
        function getInstance() {
            var isVisible = ko.observable(false),
                errorText = ko.observable(''),
                onBeforeShow = function (){},
                onBeforeClose = function() {};
            return {
                isVisible: isVisible,
                errorText: errorText,
                onBeforeShow: onBeforeShow,
                onBeforeClose: onBeforeClose
            };
        }
        return getInstance;
    });
define('core/vm/vm.filednd',
    [],
    function () {
        return {
        };
    });
define('core/vm/vm.form.participants',
    ['jquery',
        'ko',
        'core/repository',
        'core/config',
        'core/redirect'
    ],
    function ($, ko, repository, config, redirect) {
        var participants = ko.observableArray([]),
            inprogress = ko.observable(false),
            isVisible = ko.observable(false),
            form = ko.observable(),
            doOnKeyUp = function (event) {
                if (!isVisible()) return true;
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 27) {
                    isVisible(false);
                    return false;
                }
                return true;
            },
            loadParticipants = function () {
                inprogress(true);
                repository.formParticipant.getFormParticipants({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formId: form().id()
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        participants(result());
                        isVisible(true);
                    },
                    errorCallback: errorCallback
                });
            },
            view = function (participant) {
                redirect.formSigned(form().id(), participant.id());
            },
            download = function (participant) {
                redirect.downloadFormParticipantDocuments(form().id(), participant.id());
            },
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                inprogress(false);
                return false;
            };
        return {
            participants: participants,
            isVisible: isVisible,
            loadParticipants: loadParticipants,
            inprogress: inprogress,
            form: form,
            doOnKeyUp: doOnKeyUp,
            view: view,
            download: download
        };
    });
define('core/vm/vm.form.prepare',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {

        var progressCount = ko.observable(0),
            inprogress = ko.computed({
                read: function () {
                    return progressCount() > 0;
                },
                write: function (value) {
                    if (value) {
                        progressCount(progressCount() + 1);
                    } else {
                        progressCount(progressCount() - 1);
                    }
                },
                owner: this
            }),


            form = ko.observable(),
            documents = ko.observableArray([]),
            newName = ko.observable('').extend({ required: { message: config.validationMessages.required } }),
            templates = ko.observableArray([]),
            selectedTemplate = ko.observable(),
            signatureFields = ko.observableArray([]),
            previewDocument = ko.observable(),
            fields = ko.observableArray([]),
            formFields = ko.observableArray([]),
            pageWidth = ko.observable(850),
            pageHeight = ko.observable(1200),
            cuttedLocation = ko.observable(),
            copiedLocation = ko.observable(),
            cuttedField = ko.observable(),
            copiedField = ko.observable(),
            selectedField = ko.observable(),
            selectedLocation = ko.observable(),
            newAcceptableValue = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            newAcceptableValueListName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            predefinedLists = ko.observableArray([]),
            selectedPredefinedList = ko.observable(),
            timer,
            fieldsForFinalFileName = ko.observableArray([]),
            outputFilename = ko.observable(),
            viewerAction = 'prepare',
            parseFields = ko.observable(false),
            init = function (formId, callback) {
                //return;
                //if (inprogress()) return;
                inprogress(true);

                repository.form.getForm({
                    itemResult: form,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formId: formId
                    },
                    doneCallback: function (result) {
                        parseFields(result.parseFields());
                        repository.formDocument.getDocuments(formId,
                            function (documentResult) {
                                documents(documentResult);
                                repository.template.getTemplates(
                                    function (templateResult) {
                                        inprogress(false);
                                        var tmpTemplates = ko.observableArray([]);
                                        _.each(templateResult, function (tpl) {
                                            if (tpl.documentsCount() == 1 && tpl.fieldsCount() > 0) {
                                                $.extend(tpl, { selected: ko.observable(false) });
                                                tmpTemplates.push(tpl);
                                            }
                                        });
                                        templates(tmpTemplates());
                                        //if (documents().length > 0)
                                        //    getDocumentFields(documents()[0].id);
                                        if (_.isFunction(callback)) {
                                            callback(result, documents);
                                        }
                                    },
                                    errorCallback
                                );
                            },
                            errorCallback);
                    },
                    errorCallback: errorCallback
                });


            },
            loadSignatureFields = function () {
                inprogress(true);
                repository.field.getFields({
                    itemsResult: signatureFields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey()
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                    },
                    errorCallback: errorCallback
                });
                inprogress(true);
                repository.predefinedList.getPredefinedLists({
                    itemsResult: predefinedLists,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey()

                    },
                    doneCallback: function (resul) {
                        inprogress(false);
                    },
                    errorCallback: errorCallback
                });
            },
            addDocument = function (fileId, callback) {
                inprogress(true);
                repository.formDocument.addDocument(form().id, fileId, 0, parseFields(),
                    function (documentResult) {
                        inprogress(false);
                        documents.push(documentResult);
                        if (_.isFunction(callback)) {
                            callback(documentResult);
                        }
                        //previewDocument(documents()[0]);
                    },
                    errorCallback);
            },
            removeDocument = function (fileId) {
                inprogress(true);
                repository.formDocument.removeDocument(form().id(), fileId(),
                    function () {
                        inprogress(false);
                        documents.remove($.grep(documents(), function (a) { return a.id() == fileId(); })[0]);
                        fields.removeAll();
                        fieldsForFinalFileName.removeAll();
                        previewDocument(null);
                    },
                    errorCallback);
            },
            viewDocument = function (fileId) {
                inprogress(true);
                redirect.viewDocument(fileId);
            },
            manageFields = function (documentId) {
               // redirect.formFields(form().id(), documentId); //??
            },
            updateForm = function () {
                saveForm(function () {
                    redirect.formDashboard();
                }, true);
            },
            saveForm = function (successCallback, forceSave) {
                if (typeof (forceSave) == "undefined" || forceSave == false) {
                    if (form().dirtyFlag().isDirty() == false && _.every(fieldsForFinalFileName(), function (fld) { return fld.selectedDirtyFlag().isDirty() == false; })) {
                        if (_.isFunction(successCallback))
                            successCallback();
                        return;
                    }
                }
                inprogress(true);

                var flds = [];
                _.each(fieldsForFinalFileName(), function (fld) {
                    if (fld.selected()) {
                        flds.push(fld.name());
                    }
                    fld.selectedDirtyFlag().reset();
                });
                return repository.form.modifyForm(form().id(), form().name(), flds, form().canParticipantDownloadForm(),
                    form().waterMarkText(), form().waterMarkImage(), form().notifyOwnerOnSign(), form().attachSignedDocument(),
                    form().notifyOtherOnSign(), form().canParticipantPrintForm(), form().requireUserAuthForSign(), form().requestUserAuthByPhoto(),
                    form().enableTypedSignature(), form().enableUploadedSignature(), form().requireUserIdentityValidation(),
                    form().canBeCommented(), form().showParticipantCommentInSignedDocument(), form().tags(),
                    function (result) {
                        inprogress(false);
                        form().dirtyFlag().reset();
                        if (successCallback)
                            successCallback();
                    },
                    errorCallback
                );

            },
            cancelPrepare = function () {
                redirect.formDashboard();
            },
            addField = function (fieldId, pageNum, relativeX, relativeY, locationHeight, locationWidth, forceNewField, fieldName) {
                inprogress(true);
                repository.formField.addField(previewDocument().id(), fieldId, forceNewField, form().id(), locationHeight, locationWidth, relativeX, relativeY, fieldName, pageNum,pageWidth(),pageHeight(),
                    function (fieldResult) {
                        inprogress(false);
                        fieldResult.locations.remove(function (item) {
                            return item.documentGuid() != previewDocument().id();
                        });
                        $.extend(fieldResult, { selected: ko.observable(false) });
                        $.extend(fieldResult, { selectedDirtyFlag: ko.DirtyFlag([fieldResult.selected]) });
                        if (forceNewField && ! _.find(fields(), function(a) { return a.id() == fieldResult.id(); })) {
                            if (fieldResult.fieldType() == config.signatureFieldType.SingleLine || fieldResult.fieldType() == config.signatureFieldType.Dropdown || fieldResult.fieldType() == config.signatureFieldType.Date) {
                                fieldsForFinalFileName.push(fieldResult);
                            }
                            fields.push(fieldResult);
                        } else {
                            $.grep(fields(), function (a) { return a.id() == fieldResult.id(); })[0].locations.push(fieldResult.locations.pop());
                        }
                    },
                    errorCallback
                );
            },
            updateFieldLocation = function (location, callback) {
                if (!location) return;
                inprogress(true);
                repository.formField.updateFieldLocation(previewDocument().id(), location.fieldGuid(), form().id(), location.locationHeight(), location.id(), location.locationWidth(),
                                                          location.locationX(), location.locationY(), location.page(), location.fontBold(), location.fontColor(), location.fontItalic(),
                                                            location.fontName(), location.fontSize(), location.fontUnderline(), location.align(),pageWidth(),pageHeight(),

                    successCallback = function (fieldResult) {
                        inprogress(false);
                        location.dirtyFlag().reset();
                        if (_.isFunction(callback)) {
                            callback(fieldResult);
                        }
                    },
                    function (error) {
                        inprogress(false);
                        config.alert({ title: "Error", message: error });
                        getDocumentFields(previewDocument().id());
                    }
                );
            },

            deleteFieldLocation = function (field, location) {
                inprogress(true);
                repository.formField.deleteFieldLocation(location.fieldGuid(), form().id(), location.id(),
                    successCallback = function () {
                        inprogress(false);
                        field.locations.remove(location);
                        if (field.locations().length == 0) {
                            fields.remove(field);
                            fieldsForFinalFileName.remove(field);
                            generateOutputFilename();
                        }
                        selectedField(null);
                        selectedLocation(null);
                    },
                    errorCallback
                );
            },
             isValidDate = function (s) {
                 if (!s || s.length == 0) return true;
                 if (s.length != 10) return false;
                 var bits = s.split('.');
                 if (!bits[0] || !bits[1] || !bits[2]) return false;
                 if (bits[2] < 1900 || bits[2] > 2100) return false;
                 var d = new Date(bits[2], bits[1] - 1, bits[0]);
                 return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
             },
            updateField = function (field, callback) {
                if (!field) return;
                if (!field.isValid()) {
                    config.alert({ title: "Field not saved", message: 'Field data is not valid' });
                    return;
                }
                if (field.fieldType() == config.signatureFieldType.Date) {
                    if (!field.settings().minYear.isValid() || !field.settings().maxYear.isValid()) {
                        config.alert({ title: "Field not saved", message: 'Invalid date settings' });
                        return;
                    }
                }
                if (field.fieldType() > 1 && field.fieldType() < 5 && field.defaultValue() != '') {
                    if (field.regularExpression() != null && !field.defaultValue().match(field.regularExpression())) {
                        config.alert({ title: "Field not saved", message: 'Default value is not valid' });
                        return;
                    }
                    if (field.fieldType() == 4 && field.regularExpression() == null && !isValidDate(field.defaultValue())) {
                        config.alert({ title: "Field not saved", message: 'Default date is not valid' });
                        return;
                    }
                }
                inprogress(true);
                repository.formField.updateField(previewDocument().id(), field.id(), form().id(), field.acceptableValuesArray().join(";"), field.defaultValue(), field.mandatory(), field.name(), "", field.regularExpression(), field.tooltip(), field.guidanceText(), field.groupName(), field.fieldType(), ko.toJSON(field.settings()),

                    successCallback = function (fieldResult) {
                        inprogress(false);
                        fieldsForFinalFileName.remove(field);
                        if (fieldResult.fieldType() == config.signatureFieldType.SingleLine || fieldResult.fieldType() == config.signatureFieldType.Dropdown || fieldResult.fieldType() == config.signatureFieldType.Date) 
                            fieldsForFinalFileName.push(field);
                        
                        field.dirtyFlag().reset();
                        if (_.isFunction(callback)) {
                            callback(fieldResult);
                        }
                    },
                    errorCallback
                );
            },

            updateMovedField = function (location, event) {
                if (!location.selected()) return;
                clearInterval(timer);
                timer = setTimeout(function () {
                    if (event.keyCode > -37 && event.keyCode <= 40)
                        updateFieldLocation(location);
                }, 2000);
            },
            getDocumentFields = function (documentId, callback) {
                inprogress(true);
                selectedField(null);
                selectedLocation(null);
                repository.formField.getFields(null, form().id(),
                    function(fieldsResult) {
                        inprogress(false);
                        fields.removeAll();
                        formFields(fieldsResult);
                        var fileNameFields = [];
                        _.each(formFields(), function(field) {
                            $.extend(field, { selected: ko.observable(false) });
                            $.extend(field, { selectedDirtyFlag: ko.DirtyFlag([field.selected]) });
                            if (field.fieldType() == config.signatureFieldType.SingleLine || field.fieldType() == config.signatureFieldType.Dropdown || field.fieldType() == config.signatureFieldType.Date) {
                                if ($.inArray(field.name(), form().fieldsInFinalFileName()) != -1)
                                    field.selected(true);
                                field.selectedDirtyFlag().reset();
                                fileNameFields.push(field);
                            }
                        });
                        ko.utils.arrayForEach(formFields(), function (item) {
                            var field = ko.mapping.fromJS(ko.toJS(item));
                            field.settings = ko.observable(field.settings);
                            _.each(field.locations(), function(location) {
                                if (location.documentGuid() != documentId) {
                                    var index = field.locations().indexOf(location);
                                    field.locations().splice(index, 1);
                                }
                            });
                            if (field.locations().length>0)
                                fields.push(field);
                        });
                        setTimeout(function () { // ie stop this script
                            var finalFields = form().fieldsInFinalFileName();
                            fileNameFields = _.sortBy(fileNameFields, function (fld) {
                                var idx = finalFields.indexOf(fld.name());
                                return idx == -1 ? fileNameFields.length : idx;

                            });
                            fieldsForFinalFileName(fileNameFields);
                            setTimeout(function () {
                                generateOutputFilename();
                            }, 1);
                        }, 1);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                    },
                    errorCallback);


                
                /*
                repository.formField.getFields(documentId, form().id(),
                    successCallback = function (fieldsResult) {
                        inprogress(false);
                        fields(fieldsResult);
                        var fileNameFields = [];
                        _.each(fields(), function (field) {
                            $.extend(field, { selected: ko.observable(false) });
                            $.extend(field, { selectedDirtyFlag: ko.DirtyFlag([field.selected]) });
                            if (field.fieldType() == config.signatureFieldType.SingleLine || field.fieldType() == config.signatureFieldType.Dropdown || field.fieldType() == config.signatureFieldType.Date) {
                                if ($.inArray(field.name(), form().fieldsInFinalFileName()) != -1)
                                    field.selected(true);
                                field.selectedDirtyFlag().reset();
                                fileNameFields.push(field);
                            }
                        });
                        setTimeout(function() { // ie stop this script
                            var finalFields = form().fieldsInFinalFileName();
                            fileNameFields = _.sortBy(fileNameFields, function (fld) {
                                var idx = finalFields.indexOf(fld.name());
                                return idx == -1 ? fileNameFields.length : idx;

                            });
                            fieldsForFinalFileName(fileNameFields);
                            setTimeout(function() {
                                generateOutputFilename();
                            }, 1);
                            
                        }, 1);
                        
                        if (_.isFunction(callback)) {
                            callback();
                        }
                    },
                    errorCallback
                );
                */
            },
            getDocumentField = function (documentId, fieldId, callback) {
                inprogress(true);
                repository.formField.getField(documentId, form().id(), fieldId,
                    function (fieldsResult) {
                        inprogress(false);
                        var field = ko.utils.arrayFirst(fields(), function (f) {
                            return f.id() === fieldId;
                        });
                        fields.replace(field, fieldsResult);
                        if (_.isFunction(callback)) {
                            callback();
                        }
                    },
                    errorCallback
                );
            },
            copyFieldLocation = function (field, location) {
                if (location.selected()) {
                    copiedLocation(location);
                    copiedField(field);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            cutFieldLocation = function (field, location) {
                if (location.selected()) {
                    if (field == null) return;
                    cuttedLocation(location);
                    cuttedField(field);
                    copiedLocation(null);
                    copiedField(null);
                    field.locations.remove(location);
                }
            },
            pasteNewField = function () {
                if (copiedLocation() != null && copiedField() != null) {
                    var signatureCopiedField = $.grep(signatureFields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), true, '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var signatureCuttedField = $.grep(signatureFields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX(), cuttedLocation().locationY(), cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), true, '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            pasteNewLocation = function () {
                if (copiedLocation() != null && copiedField() != null) {
                    var formCopiedField = $.grep(fields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    var signatureCopiedField = $.grep(signatureFields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(formCopiedField != null ? copiedLocation().fieldGuid() : signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), formCopiedField != null ? false : true, formCopiedField != null ? copiedField().name() : '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var formCuttedField = $.grep(fields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    var signatureCuttedField = $.grep(signatureFields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(formCuttedField != null ? cuttedLocation().fieldId() : signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX() + 0.05, cuttedLocation().locationY() + 0.05, cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), formCuttedField != null ? false : true, formCuttedField != null ? cuttedField().name() : '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            addFieldFromMenu = function (fieldType) {
                var signatureField = $.grep(signatureFields(), function (a) { return a.fieldType() == fieldType; })[0];
                var height, width;
                switch (fieldType) {
                    case 1:
                        //signature
                        height = 46;
                        width = 148;
                        break;
                    case 6:
                        //checkbox
                        height = 25;
                        width = 25;
                        break;
                    default:
                        height = 25;
                        width = 205;
                        break;
                }
                addField(signatureField.id(), 1, 0, 0, height, width, true, '');
            },
            selectDefaultValue = function (value) {
                if (selectedField() != null)
                    selectedField().defaultValue(value);
            },
            addAcceptableValue = function () {
                newAcceptableValue($.trim(newAcceptableValue()));
                if ($.grep(newAcceptableValue.errors(), function (error) {
                        return error != null;
                }).length > 0) {
                    newAcceptableValue.errors.showAllMessages(true);
                    return;
                };


                if (selectedField() != null && newAcceptableValue() != '') {
                    if (selectedField().acceptableValuesArray().indexOf(newAcceptableValue()) > -1) {
                        config.alert({ title: "Error", message: "Value already in list" });
                        return;
                    }
                    selectedField().acceptableValuesArray.push(newAcceptableValue());
                    newAcceptableValue('');
                    selectedPredefinedList(null);
                    newAcceptableValue.errors.showAllMessages(false);
                }

            },
            deleteAcceptableValue = function (value) {
                $.confirm({
                    title: "Delete Confirmation",
                    message: "Are you sure ?",
                    buttons: {
                        Yes: {
                            action: function () {
                                selectedField().acceptableValuesArray.remove(value);
                                if (selectedField().defaultValue() == value)
                                    selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            },
            addNewAcceptableValuesList = function () {
                if ($.grep(newAcceptableValueListName.errors(), function (error) {
                    return error != null;
                }).length > 0) {
                    newAcceptableValueListName.errors.showAllMessages(true);
                    return;
                };

                if (selectedField() != null && newAcceptableValueListName() != '') {
                    inprogress(true);
                    repository.predefinedList.addList({
                        itemsResult: predefinedLists,
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            name: newAcceptableValueListName(),
                            defaultValue: selectedField().defaultValue(),
                            values: selectedField().acceptableValues()
                        },
                        successCallback: function (result) {
                            inprogress(false);
                            predefinedLists.push(result);
                        },
                        errorCallback: function (error) {
                            config.alert({ title: "error", message: error });
                        }
                    });
                    newAcceptableValueListName('');
                    newAcceptableValueListName.errors.showAllMessages(false);
                }
            },
            deleteAcceptableValuesList = function () {
                if (selectedPredefinedList() == null) return;
                inprogress(true);
                repository.predefinedList.deleteList({
                    itemsResult: predefinedLists,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        listId: selectedPredefinedList().id()
                    },
                    successCallback: function (result) {
                        inprogress(false);
                        var selected = selectedPredefinedList();
                        selectedPredefinedList(null);
                        predefinedLists.remove(selected);
                    },
                    errorCallback: function (error) {
                        config.alert({ title: "error", message: error });
                    }
                });
            },
            addFromTemplate = function (callback) {

                if (selectedTemplate() == null) return;
                inprogress(true);
                $.each(documents(), function () {
                    var item = this;
                    removeDocument(item.id);
                });
                fields.removeAll();
                fieldsForFinalFileName.removeAll();
                previewDocument(null);
                repository.form.updateFormFromTemplate(form().id(), selectedTemplate().id(),
                    function (data) {
                        inprogress(false);
                        init(form().id(), callback);
                    },
                    errorCallback
                );
            },
            selectTemplate = function (template) {
                if (template.selected()) {
                    $.each(templates().filter(function (fltItem) {
                        return fltItem.selected() && fltItem.id != template.id;
                    }), function () {
                        this.selected(false);
                    });
                    selectedTemplate(template);
                }
            },
            resetFields = function () {

                $.confirm({
                    title: "Reset confirmation",
                    message: "Are you sure you want to reset all fields? This will remove all placed fields.",
                    buttons: {
                        Yes: {
                            action: function () {
                                var flds = [];
                                _.each(fields(), function (field) {
                                    flds[flds.length] = field.id();
                                });
                                if (flds.length > 0) {
                                    inprogress(true);
                                    repository.formField.deleteFields(form().id(), flds,
                                        function () {
                                            inprogress(false);
                                            fields.removeAll();
                                            fieldsForFinalFileName.removeAll();
                                        },
                                        errorCallback);
                                }

                            }
                        },
                        No: {}
                    }
                });
            },
            publishForm = function () {
                $.confirm({
                    title: "Publish confirmation",
                    message: "This will publish the form. Are you sure?",
                    buttons: {
                        Yes: {
                            action: function () {
                                saveForm(function () {
                                    inprogress(true);
                                    repository.form.publishForm(form().id(),
                                        function () {
                                            inprogress(false);
                                            redirect.formDashboard();
                                        },
                                        errorCallback
                                    );
                                });
                            }
                        },
                        No: {}
                    }
                });
            },
            generateOutputFilename = function () {
                var items = [];
                var fieldsTmp = fieldsForFinalFileName();
                _.each(fieldsTmp, function (fld) {
                    if (fld.selected()) {
                        items.push(fld.name() + 'value');
                    }
                });
                if (items.length > 0)
                    outputFilename(items.join('_') + ".pdf");
                else
                    outputFilename('form_{timestamp}_{participantId}.pdf');
            },
            isOwnField = function (field) {
                return true;// compatibilty with envelope viewer 
            },
            renameDocument = function (document, callback) {
                if (newName() == '')
                    return;
                repository.formDocument.renameDocument(document.formGuid(), document.documentGuid(), newName(),
                    function (response) {
                        document.name(response.result.document.name);
                        if (_.isFunction(callback)) {
                            callback(response);
                        }
                    },
                    errorCallback);
            },
            replaceDocument = function (oldDocument, newDocumentGuid, callback) {
                repository.formDocument.modifyDocument(oldDocument.formGuid(), oldDocument.documentGuid(), newDocumentGuid, 0,
                    function (newDocument) {
                        documents.push(newDocument);
                        documents.remove(oldDocument);
                        previewDocument(null);
                        getDocumentFields(newDocument.documentGuid(), function () {
                            if (_.isFunction(callback)) {
                                callback(newDocument);
                            }
                        });
                    },
                    errorCallback);
            },
            regularExpressions = ko.computed(function () {
                if (selectedField() != null && (selectedField().fieldType() == config.signatureFieldType.SingleLine || selectedField().fieldType() == config.signatureFieldType.SingleLine || selectedField().fieldType() == config.signatureFieldType.Date)) {
                    return config.fieldValidations.filter(function (item) {
                        return $.grep(item.fieldType.split(','), function (e) { return e == selectedField().fieldType(); })[0] != null;
                    });
                } else
                    return [];
            }),
            getFieldsForDocument = function (documentGuid) {
                var result = _.filter(formFields(), function (item) {
                    return _.some(item.locations(), function (location) {
                        return location.documentGuid() == documentGuid;
                    });
                });
                return result;
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };
        selectedPredefinedList.subscribe(function (newValue) {
            if (newValue != null) {
                $.confirm({
                    title: "Apply list confirmation",
                    message: "Are you sure that you apply the selected list?",
                    buttons: {
                        Yes: {
                            action: function () {
                                selectedField().acceptableValuesArray(newValue.values());
                                selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            }
        });
        ko.validation.group(newAcceptableValue);
        ko.validation.group(newAcceptableValueListName);

        return {
            inprogress: inprogress,
            form: form,
            documents: documents,
            templates: templates,
            selectedTemplate: selectedTemplate,
            selectTemplate: selectTemplate,
            init: init,
            addDocument: addDocument,
            removeDocument: removeDocument,
            viewDocument: viewDocument,
            manageFields: manageFields,
            updateForm: updateForm,
            cancelPrepare: cancelPrepare,
            previewDocument: previewDocument,
            signatureFields: signatureFields,
            fields: fields,
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            updateFieldLocation: updateFieldLocation,
            addField: addField,
            deleteFieldLocation: deleteFieldLocation,
            updateMovedField: updateMovedField,
            getDocumentFields: getDocumentFields,
            getDocumentField: getDocumentField,
            cuttedLocation: cuttedLocation,
            copiedLocation: copiedLocation,
            cuttedField: cuttedField,
            copiedField: copiedField,
            selectedField: selectedField,
            selectedLocation: selectedLocation,
            copyFieldLocation: copyFieldLocation,
            cutFieldLocation: cutFieldLocation,
            pasteNewField: pasteNewField,
            pasteNewLocation: pasteNewLocation,
            addFieldFromMenu: addFieldFromMenu,
            addFromTemplate: addFromTemplate,
            publishForm: publishForm,
            config: config,
            newAcceptableValue: newAcceptableValue,
            newAcceptableValueListName: newAcceptableValueListName,
            predefinedLists: predefinedLists,
            selectedPredefinedList: selectedPredefinedList,
            selectDefaultValue: selectDefaultValue,
            addAcceptableValue: addAcceptableValue,
            deleteAcceptableValue: deleteAcceptableValue,
            addNewAcceptableValuesList: addNewAcceptableValuesList,
            isOwnField: isOwnField,
            updateField: updateField,
            resetFields: resetFields,
            fieldsForFinalFileName: fieldsForFinalFileName,
            generateOutputFilename: generateOutputFilename,
            outputFilename: outputFilename,
            loadSignatureFields: loadSignatureFields,
            viewerAction: viewerAction,
            saveForm: saveForm,
            parseFields: parseFields,
            renameDocument: renameDocument,
            newName: newName,
            replaceDocument: replaceDocument,
            regularExpressions: regularExpressions,
            deleteAcceptableValuesList: deleteAcceptableValuesList,
            getFieldsForDocument: getFieldsForDocument
        };
    });
define('core/vm/vm.form.signed',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/routes'],
    function ($, ko, _, repository, configuration, routes) {
        var viewerAction = 'signed',
            config = configuration,
            inprogress = ko.observable(false),
            formId = ko.observable(''),
            participants = ko.observableArray([]),
            defaultParticipantId = ko.observable(),
            selectedParticipant = ko.observable(),
            selectedDocument = ko.observable(),
            loadParticipants = function() {
                inprogress(true);
                repository.formParticipant.getFormParticipants({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formId: formId()
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        participants(result());
                        var selected = ko.utils.arrayFirst(participants(), function (item) {
                            return item.id() == defaultParticipantId();
                        });
                        if (selected != null) {
                            selectedParticipant(selected);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            downloadLink = ko.computed(function () {
                return formId()!=null && selectedParticipant()!=null ? routes.publicDownloadFormDocumentsUrl(formId(), selectedParticipant().id()) : "";
            }),
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                inprogress(false);
                return false;
            },
            init = function () {
                loadParticipants();
            };

        //init();

        return {
            init: init,
            viewerAction: viewerAction,
            config: config,
            inprogress: inprogress,
            formId: formId,
            participants: participants,
            selectedParticipant: selectedParticipant,
            selectedDocument: selectedDocument,
            downloadLink: downloadLink,
            defaultParticipantId: defaultParticipantId,
        };
    });
define('core/vm/vm.form.signedEmbed',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/routes'],
    function ($, ko, _, repository, configuration, routes) {
        var viewerAction = 'signed',
            config = configuration,
            inprogress = ko.observable(false),
            documents = ko.observableArray([]),
            signedDocument = ko.observable(null),
            documentGuid = ko.observable(''),
            canDownload = ko.observable(false),
            canPrint = ko.observable(false),
            formId = ko.observable(''),
            participantId = ko.observable(''),
            loadForm = function (callback) {
                inprogress(true);
                repository.form.publicGetFormParticipant(formId(), participantId(),
                    function (result) {
                        if (result.status == 1) {
                            setTimeout(function () {
                                loadForm(callback);
                            }, 2000);
                        } else {
                            inprogress(false);
                            documents.removeAll();
                            _.each(result.signedDocuments, function (doc) {
                                documents.push({
                                        name : ko.observable(doc.name),
                                        documentGuid : ko.observable(doc.documentGuid)
                                });
                            });
                            signedDocument(documents[0]);
                            if (_.isFunction(callback)) {
                                callback(result.signedDocuments[0]);
                            }                            
                        }
                    }, errorCallback
                );

            },
            downloadLink = ko.computed( function() {
                if (canDownload())
                    return routes.publicDownloadFormDocumentsUrl(formId(),participantId());
                else
                    return '#';
            }),
            errorCallback = function(error) {
                config.alert({ title: "Error", message: error });
                inprogress(false);
                return false;
            },
            init = function() {
                
            };
            
        init();
        
        return {
            viewerAction: viewerAction,
            config: config,
            inprogress: inprogress,
            formId: formId,
            participantId:participantId,
            loadForm: loadForm,
            documentGuid: documentGuid,
            canDownload: canDownload,
            downloadLink: downloadLink,
            canPrint: canPrint,
            documents: documents,
            signedDocument: signedDocument
        };
    });
define('core/vm/vm.form.signEmbed',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect',
        'core/eventManager'],
    function ($, ko, _, repository, configuration, redirect, event) {
        var viewerAction = 'sign',
            config = configuration,
            eventManager = new event({
                formFieldFilledCallback: function (data) {
                    var fieldData = JSON.parse(data.data);
                    var field = ko.utils.arrayFirst(fields(), function (item) {
                        return item.id() == fieldData.fieldId;
                    });
                    field.progress(data.percent);
                }
            }),
            inprogress = ko.observable(false),
             _formId = '',
            _participandId = '',
           // form = ko.observable(),
           isValidated = ko.observable(false), 
            documents = ko.observableArray([]),
            signDocument = ko.observable(),
            fields = ko.observableArray([]),
            locations = ko.observableArray([]),
            hideStartButton = ko.observable(false),
            isOwnField = function (field) {
                return true;
            },
            loadDocument = function (formId, particpiantId, callback) {
                inprogress(true);
                _participandId = particpiantId;
                _formId = formId;
                repository.formDocument.publicGetDocuments(formId,
                    function (documentResult) {
                        inprogress(false);
                        documents(documentResult);
                        signDocument(documentResult[0]);
                        if (_.isFunction(callback)) {
                            callback(documentResult[0]);
                        }
                    }, errorCallback);
            },
            loadFields = function (documentId, callback) {
                if (inprogress()) return;
                inprogress(true);
                fields.removeAll();
                locations.removeAll();
                repository.formField.publicGetFields(null, _formId, _participandId,
                    function(fieldsResult) {
                        var fieldLocations = [];
                        ko.utils.arrayForEach(fieldsResult, function(docField) {
                            docField.locations.remove(function(item) {
                                return item.documentGuid() != documentId;
                            });
                        });
                        _.each(fieldsResult, function (item) {
                            var validators = {};
                            if (item.fieldType() != configuration.signatureFieldType.Date) {
                                if (item.regularExpression() != null && item.regularExpression() != '') {
                                    var errorMessage = $.grep(config.fieldValidations, function (r) { return r.expression == item.regularExpression(); })[0].errorMessage;
                                    validators.pattern = { params: item.regularExpression(), message: errorMessage };
                                }
                            }
                            var groupMandatory = false;
                            if (item.fieldType() == configuration.signatureFieldType.Checkbox && item.groupName() != "") {
                                groupMandatory = _.filter(fieldsResult, function(fld) {
                                    return fld.groupName() == item.groupName() && item.mandatory();
                                }).length > 0;
                            }
                            if (item.mandatory() || groupMandatory) {
                                validators.required = { message: "" };
                                if (item.fieldType() == configuration.signatureFieldType.Checkbox)
                                    validators.validation = {
                                        validator: function(val) {
                                            if (item.groupName() != '') {
                                                var checkedGroupFields = _.filter(fields(), function(fld) {
                                                    return fld.groupName() == item.groupName() && fld.data() == 'on';
                                                });
                                                return checkedGroupFields.length > 0;
                                            } else
                                                return val && val == 'on';
                                        }
                                    };
                            }
                            if ((item.data() == null || item.data() == '') && item.defaultValue() != null && item.defaultValue() != '') {
                                item.data(item.defaultValue());
                                fillField(item, item.locations()[0]);
                            }
                            item.data.extend(validators);
                            item.dirtyFlag = new ko.DirtyFlag([item.data]);
                            fields.push(item);
                            if (isOwnField(item)) {
                                _.each(item.locations(), function (l) {
                                    fieldLocations.push(l);
                                });
                            }
                        });
                        if (fieldLocations.length > 0) {
                            /*
                            fieldLocations.sort(function (left, right) {
                                var pageHeight = 1105;
                                var pageWidth = 854;
                                var pageSize = pageHeight * pageWidth;
                                var p1 = left.page() * pageHeight*pageSize + left.locationY() * pageWidth + left.locationX();
                                var p2 = right.page() * pageHeight*pageSize + right.locationY() * pageWidth + right.locationX();
                                return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                            });
                            */
                            fieldLocations.sort(function (left, right) {
                                var p1 = left.order();
                                var p2 = right.order();
                                return p1 == p2 ? 0 : (p1 < p2 ? -1 : 1);
                            });
                            locations(fieldLocations);
                        }
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                        inprogress(false);
                    },
                    errorCallback
                );
            },
            fillField = function (field, location) {
                if (field.data() == null) return;
                inprogress(true);
                repository.formField.publicFillField(field.data(), location.documentGuid(), field.id(), _formId, _participandId,
                    function (fieldsResult) {
                        inprogress(false);
                    },
                    errorCallback
                );
            },
            signForm = function (participantName,authData, comment,email) {
                inprogress(true);
                repository.form.publicSignForm(_formId, _participandId, participantName,authData, comment,email,
                    function (result) {
                        inprogress(false);
                        redirect.embedFormSigned(_formId, _participandId);
                    },
                    function(error) {
                        errorCallback(error, function () {
                            window.location.reload();
                        });
                    }
                );
            },
            getActiveLocation = function () {
                return _.find(locations(), function (item) { return item.selected(); });
            },
            activateNextLocation = function () {
                var selectedLocation = getActiveLocation();
                if (selectedLocation != null) {
                    var selectedLocationIndex = locations.indexOf(selectedLocation);
                    var nextLocationIndex;
                    if (locations().length > selectedLocationIndex + 1) {
                        nextLocationIndex = selectedLocationIndex + 1;
                    } else {
                        nextLocationIndex = 0;
                    }
                    activateLocation(locations()[nextLocationIndex]);
                } else {
                    if (locations().length > 0) {
                        activateLocation(locations()[0]);
                    }
                }
                hideStartButton(true);
            },
            activatePrevLocation = function () {
                var selectedLocation = getActiveLocation();
                if (selectedLocation != null) {
                    var selectedLocationIndex = locations.indexOf(selectedLocation);
                    var prevLocationIndex;
                    if (selectedLocationIndex > 0) {
                        prevLocationIndex = selectedLocationIndex - 1;
                    } else {
                        prevLocationIndex = locations().length - 1;
                    }
                    activateLocation(locations()[prevLocationIndex]);
                }
                hideStartButton(true);
            },
            fieldsToBeFilled = function () {
                if (!fields() || fields().length == 0)
                    return -1;
                var invalidFields = 0;
                $.each(fields(), function () {
                    if (isOwnField(this)) {
                        if (!this.isValid()) {
                            invalidFields++;
                        }
                    }
                });
                return invalidFields;
            },
            hasPrevLocation = function () {
                return locations.indexOf(getActiveLocation()) == 0;
            },
            hasNextLocation = function () {
                return locations.indexOf(getActiveLocation()) < locations().length - 1;
            },
            activateLocation = function (location) {
                if (location == null) return;
                $.each(locations(), function () { this.selected(false); });
                location.selected(true);
                hideStartButton(true);
            },
            getActiveField = function () {
                var location = getActiveLocation();
                return _.find(fields(), function (item) { return item.id() == location.fieldGuid(); });
            },
            activateFirstInvalidLocation = function () {
                var field;
                $.each(fields(), function () {
                    if (isOwnField(this)) {
                        if (!this.isValid()) {
                            field = this;
                            return false;
                        }
                    }
                });
                if (field != null)
                    activateLocation(field.locations()[0]);
            },
            fileUploaded = function (field, location, evt) {
                if (config.checkFileApiSupport()) {
                    var frField = new FileReader();
                    frField.onload = function(e) {
                        field.data(JSON.stringify({
                            size: evt.target.files[0].size,
                            type: evt.target.files[0].type,
                            name: evt.target.files[0].name,
                            data: e.target.result
                        }));
                        fillField(field, location);
                    };
                    frField.readAsDataURL(evt.target.files[0]);
                } else {
                    requirejs(['lib/fileApi/FileAPI'], function() {
                        var files = FileAPI.getFiles(evt);
                        FileAPI.readAsDataURL(files[0], function (dataUrlObject) {
                            if (dataUrlObject.type == 'load') {
                                field.data(JSON.stringify({
                                    size: files[0].size,
                                    type: files[0].type,
                                    name: files[0].name,
                                    data: dataUrlObject.result
                                }));
                                fillField(field, location);
                            }
                        });
                    });
                }
            },
            errorCallback = function (error, closeCallback) {
                inprogress(false);
                config.alert({ title: "Error", message: error, closeCallback: closeCallback });
                return false;
            };
        return {
            viewerAction: viewerAction,
            config: config,
            inprogress: inprogress,
            documents: documents,
            signDocument: signDocument,
            fields: fields,
            isOwnField: isOwnField,
            fillField: fillField,
            signForm: signForm,
            locations: locations,
            activateNextLocation: activateNextLocation,
            activatePrevLocation: activatePrevLocation,
            fieldsToBeFilled: fieldsToBeFilled,
            hasPrevLocation: hasPrevLocation,
            hasNextLocation: hasNextLocation,
            getActiveLocation: getActiveLocation,
            activateLocation: activateLocation,
            activateFirstInvalidLocation: activateFirstInvalidLocation,
            hideStartButton: hideStartButton,
            getActiveField: getActiveField,
            loadDocument: loadDocument,
            loadFields: loadFields,
            fileUploaded: fileUploaded
        };
    });
define('core/vm/vm.form.validate',
    ['ko', 'core/config', 'core/repository'],
    function (ko, config, repository) {

        function getInstance() {
            var isVisible = ko.observable(false),
                inprogress = ko.observable(false),
                email = ko.observable().extend({ required: { message: config.validationMessages.required }, email: { message: config.validationMessages.invalidEmail }, noSpaces: {} }),
                code = ko.escapedObservable(""),
                emailExist = ko.observable(false),
                formId = ko.observable(),
                participantId = ko.observable(),

                validate = function () {
                    if (!code() || code().length != 10)
                        return;
                    inprogress(true);
                    repository.form.publicValidateFormParticipant(formId(), participantId(), code(),
                         function (result) {
                             inprogress(false);
                             if (result == true)
                                 isVisible(false);
                             else {
                                 config.alert({ title: "Error", message: "Provided code is not valid" });
                             }
                             
                         },
                         errorCallback
                     );
                    
                },
                setEmail = function () {
                    if (!email.isValid())
                        return;
                    inprogress(true);
                    repository.form.publicModifyFormParticipant(formId(), participantId(), email(),
                         function (result) {
                             inprogress(false);
                             email(result.email);
                             emailExist(result.email && result.email.length > 5);
                         },
                         errorCallback
                     );
                },
                loadParticipant = function () {
                    inprogress(true);
                    repository.form.publicGetFormParticipant(formId(), participantId(),
                        function (result) {
                            inprogress(false);
                            if (result.status == 1) {//tdo status
                                
                            }
                            email(result.email);
                            emailExist(result.email && result.email.length > 5);
                        },
                        errorCallback
                    );

                },
                resentValidationCode= function () {
                    inprogress(true);
                    repository.form.publicFormParticipantResentValidationCode(formId(), participantId(),
                         function (result) {
                             inprogress(false);
                             if (result == true)
                                 config.alert({ title: "Information", message: "Email was sent to "+email() });
                            

                         },
                         errorCallback
                     );

                },
                errorCallback = function (error) {
                    config.alert({ title: "Error", message: error });
                    inprogress(false);
                    return false;
                },
                init = function (formid, participantid) {
                    isVisible(true);
                    formId(formid);
                    participantId(participantid);
                    loadParticipant();
                }
            ;
            //ko.validation.group(email);

            return {
                isVisible: isVisible,
                inprogress: inprogress,
                validate: validate,
                email: email,
                code: code,
                emailExist:emailExist,
                setEmail: setEmail,
                init: init,
                resentValidationCode: resentValidationCode
            };
        }
        return getInstance;
    });
define('core/vm/vm.forms',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function ($, ko, _, repository, config, redirect) {
        var forms = ko.observableArray([]),
            inprogress = ko.observable(false),
            totalCount = ko.observable(10),
            statusId = ko.observable('-3'),
            page = ko.observable(1),
            itemsPerPage = ko.observable(1000),
            documentId = ko.observable(''),
            date = ko.observable(''),
            name = ko.observable(''),
            tag = ko.observable(''),
            loadForms = function(options, callback) {
                if (inprogress()) return;

                if (options != null && options.clearAll != null && options.clearAll) {
                    forms.removeAll();
                    totalCount(0);
                }
                if (options != null && options.page != null)
                    page(options.page);
                if (options != null && options.documentId != null)
                    documentId(options.documentId);
                if (options != null && options.date != null)
                    date(options.date);
                if (options != null && options.statusId != null)
                    statusId(options.statusId);
                if (options != null && options.name != null)
                    name(options.name);
                if (options != null && options.tag != null)
                    tag(options.tag);
                inprogress(true);
                repository.form.getForms({
                    forceRefresh: true,
                    itemsResult: forms,
                    itemsCount: totalCount,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        statusId: statusId(),
                        page: page(),
                        pageSize: itemsPerPage(),
                        documentId: documentId(),
                        date: date(),
                        name: name(),
                        tag: tag()
                    },
                    doneCallback: function() {
                        inprogress(false);
                        resizeElements();
                    },
                    errorCallback:errorCallback
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            createForm = function() {
                if (inprogress()) return;
                inprogress(true);
                repository.form.createForm(
                    doneCallback= function(result) {
                       // dispaly progress intil redirect happen inprogress(false);
                        redirect.formView(result.form.id);
                    },
                    errorCallback
                );
            },
            openForm = function(form) {
                if (form.status() == -1) { //draft
                    redirect.formView(form.id());
                }
            },
            completeForm = function(form) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.completeForm({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formId: form.id()
                    },
                    doneCallback: function() {
                        inprogress(false);
                        loadForms({ clearAll: true, page: 1 });
                    },
                    errorCallback:errorCallback
                });
            },
            deleteForm = function(form) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.deleteForms({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formsIds: [form.id()]
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        forms.remove(form);
                    },
                    errorCallback:errorCallback
                });
            },
            archiveForm = function(form) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.archiveForm({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        formId: form.id()
                    },
                    doneCallback: function() {
                        inprogress(false);
                        loadForms({ clearAll: true, page: 1 });
                    },
                    errorCallback:errorCallback
                });
            },
            selectedItems = ko.computed( function (){
                return _.filter(forms(), function (form) {
                    return form.selected() == true;
                });
            }),
            deleteSelected = function () {
                 if (inprogress()) return;
                 $.confirm({
                     title: "Delete confirmation",
                     message: "Are you sure you want to delete selected forms?" + (statusId()!='3'? " <br />Note: Only forms with status 'Draft' will be deleted.":""),
                     buttons: {
                         Yes: {
                             'class': "",
                             'action': function () {
                                 var ignoredItems = 0;
                                 var formIds = [];
                                 $.each(selectedItems(), function () {
                                     if (this.status() == -1 || this.status() == 3) { // drafts and archived can be deleted only
                                         formIds[formIds.length] = this.id();
                                     } else {
                                         ignoredItems++;
                                     }
                                 });
                                 if (ignoredItems > 0) {
                                     setTimeout(function () {
                                         config.alert({ title: "Notification", message: ignoredItems + " " + (ignoredItems == 1 ? "item was" : "items were") + " not processed, the status doesn't allow deleting" });
                                     }, 100);
                                 }
                                 if (formIds.length > 0) {
                                     inprogress(true);
                                     repository.form.deleteForms({
                                         param: {
                                             userId: config.userId(),
                                             privateKey: config.privateKey(),
                                             formsIds: formIds
                                         },
                                         doneCallback: function(result) {
                                             inprogress(false);
                                             _.each(formIds, function (f) {
                                                 var frm = ko.utils.arrayFirst(forms(), function (form) {
                                                     return form.id() == f;
                                                 });
                                                 forms.remove(frm);
                                             });
                                         },
                                         errorCallback:errorCallback
                                     });
                                 }
                             }
                         },
                         No: {}
                     }
                 });   
            },
            archiveSelected= function () {
                var self = this;
                $.confirm({
                    title: "Archive confirmation",
                    message: "Are you sure you want to archive selected forms? <br />Note: Only forms with status 'Completed' will be archived.",
                    buttons: {
                        Yes: {
                            'class': "",
                            'action': function () {
                                var ignoredItems = 0;
                                var formIds = [];
                                $.each(selectedItems(), function () {
                                    if (this.status() == 2) {
                                        formIds[formIds.length] = this.id();
                                    } else {
                                        ignoredItems++;
                                    }
                                });
                                if (ignoredItems > 0) {
                                    setTimeout(function () {
                                        config.alert({ title: "Notification", message: ignoredItems + " " + (ignoredItems == 1 ? "item was" : "items were") + " not processed, the status doesn't allow archivng" });
                                    }, 100);
                                }
                                if (formIds.length > 0) {
                                    inprogress(true);
                                    repository.form.archiveForms(formIds,
                                        doneCallback = function(result) {
                                            inprogress(false);
                                            loadForms({ clearAll: true, page: 1 });
                                        },
                                        errorCallback);
                                }
                            }
                        },
                        No: {}
                    }
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            },
            checkAll = function () {
                var newValue = !allSelected();
                _.each(forms(), function (form) {
                    form.selected(newValue);
                });
            },
            allSelected = ko.computed(function () {
                return forms().length > 0 &&
                    $.grep(forms(), function(form) {
                        return form.selected() == true;
                    }).length == forms().length;
            }),
            publishForm = function (form) {
                repository.form.publishForm(form.id(),
                                       function () {
                                           inprogress(false);
                                           loadForms({ clearAll: true, page: 1 });
                                       },
                                       errorCallback
                                   );
               
            },
            copyForm = function (form) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.createForm(
                    doneCallback = function (result) {
                        redirect.formView(result.form.id);
                    },
                    errorCallback,
                    '','','','','',form.id()
                );
            },
            createFormFromDocument = function (documents) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.createForm(
                    doneCallback = function (formResult) {
                        inprogress(false);
                        var $deferreds = [];
                        for (var i = 0; i < documents.length; i++) {
                            $deferreds[i] = $.Deferred(function (def) {
                                repository.formDocument.addDocument(formResult.form.id, documents[i], 0, false,
                                    doneCallback = function (documentResult) {
                                        def.resolve(documentResult);

                                    },
                                    errorCallback = function (error) {
                                        inprogress(false);
                                        def.reject(error);
                                    });
                            }).promise();
                        }
                        $.when.apply(null, $deferreds).then(function () {
                            inprogress(false);
                            redirect.formView(formResult.form.id);
                        });
                    },
                    errorCallback
                );
            },
            loadFormDocuments = function (form, callback) {
                if (form.documentNames() == '') {
                    repository.formDocument.publicGetDocuments(form.id(),
                        function(documentResult) {
                            var names = [];
                            ko.utils.arrayForEach(documentResult, function (item) {
                                names.push(item.name());
                            });
                            if (names.length > 0)
                                form.documentNames("Document(s): " + names.join(', '));
                            if (_.isFunction(callback)) {
                                callback();
                            }
                        }, errorCallback);
                }
            },
            init = function() {

            };
        
        init();

        return {
            inprogress: inprogress,
            loadForms: loadForms,
            forms: forms,
            totalCount: totalCount,
            itemsPerPage: itemsPerPage,
            page: page,
            createForm: createForm,
            openForm: openForm,
            completeForm: completeForm,
            deleteForm: deleteForm,
            archiveForm: archiveForm,
            statusId: statusId,
            checkAll: checkAll,
            selectedItems: selectedItems,
            deleteSelected: deleteSelected,
            archiveSelected: archiveSelected,
            allSelected: allSelected,
            publishForm: publishForm,
            copyForm: copyForm,
            createFormFromDocument: createFormFromDocument,
            loadFormDocuments: loadFormDocuments
        };
    });
define('core/vm/vm.forms.resources',
    ['ko', 'lib/underscore', 'core/repository', 'core/config'],
    function (ko, _, repository, config) {
        var inprogress = ko.observable(false),
            resources = ko.observableArray([]),
            statusId = ko.observable(),
            selectedDocument = ko.observable(),
            selectedDate = ko.observable(),
            selectedStatus = ko.observable(),
            selectedTag = ko.observable(),
            dashboardInprogress = ko.observable(),
            loadResources = function (callback) {
                if (inprogress()) return;
                inprogress(true);
                repository.formResource.getResources({
                    resourcesResult: resources,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        statusIds: statusId()
                    },
                    doneCallback: function () {
                        inprogress(false);
                    }
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            init = function () {

            };
        return {
            inprogress: inprogress,
            loadResources: loadResources,
            resources: resources,
            statusId: statusId,
            selectedDocument: selectedDocument,
            selectedDate: selectedDate,
            selectedStatus: selectedStatus,
            dashboardInprogress: dashboardInprogress,
            selectedTag: selectedTag
        };
    });
define('core/vm/vm.loading',
    ['ko'],
    function (ko) {
        var inprogress = ko.observable(false);
        return {
            inprogress: inprogress
        };
    });
define('core/vm/vm.navigationmenu',
    ['ko',
    'core/repository',
    'core/config',
    'core/redirect'],  
    function (ko, repository, config, redirect) {
        var areas = {
                Envelopes: 0,
                Templates: 1,
                Forms: 2,
                Contacts: 3,
                Signatures: 4,
                Archived: 5
            },
            inprogress = ko.observable(false),
            selectedArea = ko.observable(0),
            openEnvelopeDashboard = function () {
                redirect.envelopeDashboard();
            },
            createEnvelope = function () {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.createEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New envelope"
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        redirect.envelopeView(result.envelope.id);
                    },
                    errorCallback:errorCallback
                });

            },
            openContactDashboard = function() {
                redirect.contactDashboard();
            },
            openTemplateDashboard = function() {
                redirect.templateDashboard();
            },
            openSignatureDashboard = function () {
                redirect.signatureDashboard();
            },
            openFormDashboard = function () {
                redirect.formDashboard();
            },
            showArchivedLink = ko.computed(function () {
                return selectedArea() == areas.Envelopes || selectedArea() == areas.Forms || selectedArea() == areas.Archived;
            }),
            openArchivedDashboard = function() {
                if (selectedArea() == areas.Envelopes) {
                    redirect.envelopeArchivedDashboard();
                }
                if (selectedArea() == areas.Forms) {
                    redirect.formArchivedDashboard();
                }
            },
            createForm = function () {
                if (inprogress()) return;
                inprogress(true);
                repository.form.createForm(
                    doneCallback = function (result) {
                        inprogress(false);
                        redirect.formView(result.form.id);
                    },
                    errorCallback
                );
            },
            createTemplate = function () {
                if (inprogress()) return;
                inprogress(true);
                repository.template.createTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New template"
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        redirect.templateView(result.template.id);
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                return false;
            }
        ;
        return {
            inprogress: inprogress,
            areas: areas,
            selectedArea: selectedArea,
            openEnvelopeDashboard: openEnvelopeDashboard,
            createEnvelope: createEnvelope,
            openContactDashboard: openContactDashboard,
            openTemplateDashboard: openTemplateDashboard,
            openSignatureDashboard: openSignatureDashboard,
            openFormDashboard: openFormDashboard,
            showArchivedLink: showArchivedLink,
            openArchivedDashboard: openArchivedDashboard,
            createForm: createForm,
            createTemplate: createTemplate
        };
    });
define('core/vm/vm.quicksearch',
    [],
    function() {
        var searchText = ko.escapedObservable(""),
            clear = function() {
                searchText("");
            };
        return {
            searchText: searchText,
            clear: clear
        };
    });
define('core/vm/vm.signaturedetails',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config'],
    function ($, ko, _, repository, config) {
        var currentSignature = ko.observable(repository.signature.getBlank()),
            inprogress = ko.observable(false),
            isVisible = ko.observable(false),
            isNew = ko.observable(false),
            setNewSignature = function() {
                isNew(true);
                currentSignature(repository.signature.getBlank());
                currentSignature().errors.showAllMessages(true);
            },
            editSignature = function(signature) {
                isNew(false);
                currentSignature(signature);
            },
            doOnKeyUp = function(event) {
                if (!isVisible()) return true;
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 13) {
                    if (isNew()) {
                        addSignature();
                    } else {
                        updateSignature();
                    }
                    return false;
                }
                if (keyCode === 27) {
                    isVisible(false);
                    return false;
                }
                return true;
            },
            addSignature = function(callback) {
                if (!currentSignature().isValid()) {
                    currentSignature().errors.showAllMessages(true);
                    return;
                }
                if (inprogress() == true)
                    return;
                inprogress(true);
                repository.signature.createSignature({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        envelopeName: currentSignature().name(),
                        companyName: currentSignature().companyName(),
                        position: currentSignature().position(),
                        firstName: currentSignature().firstName(),
                        lastName: currentSignature().lastName(),
                        textInitials: currentSignature().textInitials(),
                        signatureData: currentSignature().signatureImageUrl(),
                        initialsData: ""
                    },
                    successCallback: function (signatureResult) {
                        inprogress(false);
                        isVisible(false);
                        if (_.isFunction(callback)) {
                            callback(signatureResult);
                        }

                    },
                    errorCallback: errorCallback
                });
            },
            updateSignature = function (callback) {
                if (!currentSignature().isValid()) {
                    currentSignature().errors.showAllMessages(true);
                    return;
                }
                repository.signature.updateSignature({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        signatureId: currentSignature().id(),
                        name: currentSignature().name(),
                        companyName: currentSignature().companyName(),
                        position: currentSignature().position(),
                        firstName: currentSignature().firstName(),
                        lastName: currentSignature().lastName(),
                        textInitials: currentSignature().textInitials(),
                        signatureData: currentSignature().signatureImageUrl(),
                        initialsData: ""
                    },
                    successCallback: function (signatureResult) {
                        inprogress(false);
                        isVisible(false);
                        if (_.isFunction(callback)) {
                            callback(signatureResult);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            },
            init = function() {
            };

        init();
        return {
            inprogress: inprogress,
            currentSignature: currentSignature,
            isVisible: isVisible,
            isNew: isNew,
            setNewSignature: setNewSignature,
            editSignature: editSignature,
            doOnKeyUp: doOnKeyUp,
            addSignature: addSignature,
            updateSignature: updateSignature
        };
    });
define('core/vm/vm.signaturepad',
    ['jquery',
     'lib/underscore',
        'ko',
        'core/repository',
        'core/config'
    ],
    function ($, _, ko, repository, config) {

        function getInstance() {
            var isVisible = ko.observable(false),
                inprogress = ko.observable(true),
                showSelectTab = ko.observable(true),
                showSaveButton = ko.observable(true),
                showTypeItTab = ko.observable(true),
                showUploadTab = ko.observable(true),
                fontsLoading = ko.observable(false),
                signatures = ko.observableArray([]),
                itemsCount = ko.observable(),
                fontsArray = ko.observableArray([]),
                loadedFontsArray = ko.observableArray([]),
                signatureText = ko.escapedObservable(config.userName()),
                uploadedImage = ko.observable(),
                saveToMySignatures = ko.observable(false),
                vectorPad = ko.observable(true),
                signatureColors = ko.observableArray(config.signatureColors),
                signatureColor = ko.observable(config.signatureColors[0]),
                expanded = ko.observable(false),
                drawPadSvg,
                drawPadCanvas,
                forceRasterSignatureCanvas = false,
                initialized = false,
                padIndex = ko.observable(Math.floor(Math.random() * 9999) + 1),
                matchWidth = ko.observable(false),
                activeSignatureColor = ko.computed({
                    read: function() {
                        return vectorPad() ? signatureColor() == "" ? config.signatureColors[0] : signatureColor() : config.signatureColors[0];
                    },
                    write: function(value) {
                        if (vectorPad()) {
                            if (value == '')
                                signatureColor(config.signatureColors[0]);
                            else
                                signatureColor(value);
                        }
                    }
                }),
                signatureIsValid = function() {
                    if (vectorPad()) {
                        if (typeof(drawPadSvg) != "undefined")
                            return drawPadSvg.getPaths().length > 0;
                        return false;
                    }
                    return drawPadCanvas.getSignatureImage().length > 650;
                },
                padWidth = 264,
                padHeight = 88,
                signaturesLodaded = false,
                loadSignatures = function() {
                    if (signatures().length == 0 && showSelectTab() && !signaturesLodaded) {
                        inprogress(true);
                        repository.signature.getSignatures({
                            itemsResult: signatures,
                            itemsCount: itemsCount,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                page: 1,
                                count: 100000,
                                name: ''
                            },
                            doneCallback: function(result) {
                                inprogress(false);
                                signaturesLodaded = true;
                            },
                            errorCallback: errorCallback
                        });
                    }
                },
                saveSignature = function(envelopeName, signatureData) {
                    inprogress(true);
                    repository.signature.createSignature({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            envelopeName: envelopeName,
                            companyName: '',
                            position: '',
                            firstName: '',
                            lastName: '',
                            textInitials: '',
                            signatureData: signatureData,
                            initialsData: ''
                        },
                        successCallback: function(signatureResult) {
                            inprogress(false);
                            if (showSelectTab())
                                signatures.unshift(signatureResult);
                            saveToMySignatures(false);
                        },
                        errorCallback: errorCallback
                    });
                },
                onPopupShow = function() {
                },
                errorCallback = function(error) {
                    config.alert({ title: "Error", message: error });
                    return false;
                },
                savedSignatureAfterRender = function() {
                },
                createImageFromTypedSignature = function(fontName, fontSize) {
                    var tmpCanvas = document.createElement('canvas'), tmpContext = null;
                    tmpCanvas.style.position = 'absolute';
                    tmpCanvas.style.top = '-999em';
                    tmpCanvas.width = padWidth;
                    tmpCanvas.height = padHeight;
                    document.body.appendChild(tmpCanvas);
                    if (!tmpCanvas.getContext && FlashCanvas)
                        FlashCanvas.initElement(tmpCanvas);
                    tmpContext = tmpCanvas.getContext('2d');
                    //tmpContext.fillStyle = '#ffffff';
                    //tmpContext.fillRect(0, 0, padWidth, padHeight);
                    tmpContext.lineWidth = 2;
                    tmpContext.strokeStyle = activeSignatureColor();
                    tmpContext.font = "normal " + fontSize + " '" + fontName + "'";
                    tmpContext.fillStyle = activeSignatureColor();
                    tmpContext.fillText(signatureText() == "" ? "Signature" : signatureText(), 5, 60);
                    return tmpCanvas.toDataURL.apply(tmpCanvas);
                },
                createSvgFromTypedSignature = function(fontName, fontSize, width, height) {
                    //var fontHeight = parseInt(fontSize.replace("px", ""));
                    var w = width || padWidth;
                    var h = height || padHeight;

                    var svg = $("<svg />")
                        .attr("xmlns", "http://www.w3.org/2000/svg")
                        .attr("width", "100%")
                        .attr("height", "100%")
                        //.attr("height", padHeight)
                        .attr("viewBox", "0 0 " + w + " " + h)
                        .attr("preserveAspectRatio", "none")
                        .append(
                            $("<text />")
                                .attr("font-family", fontName)
                                .attr("font-size", fontSize)
                                .attr("fill", activeSignatureColor())
                                .attr("y", "50%")
                                .attr("x", "50%")
                                //.attr("dominant-baseline", "central")
                                .attr("dy", "0.3em")
                                .attr("text-anchor", "middle")
                                .html(signatureText() == "" ? "Signature" : signatureText())
                        )                   
                        .append(
                            $("<defs />")
                                .append(
                                    $("<link />")
                                        .attr("href", 'http://fonts.googleapis.com/css?family=' + fontName.replace(/ /g, '+'))
                                        .attr("type", "text/css")
                                        .attr("rel", "stylesheet")
                                        .attr("xmlns", "http://www.w3.org/1999/xhtml")
                                )
                                .append(
                                    $("<style />")
                                        .attr("type", "text/css")
                                        .html("@import url(" + 'http://fonts.googleapis.com/css?family=' + fontName.replace(/ /g, '+') + ")")
                                )
                        )
                    ;
                    return $("<div>")
                        .append(svg)
                        .html();
                },
                readUploadedFile = function(file) {
                    var frSignature = new FileReader();
                    frSignature.onload = function(e) {
                        uploadedImage(e.target.result);
                    };
                    frSignature.readAsDataURL(file);
                },
                fileDragged = function (item, event, files) {
                    if (files.length > 0) {
                        var inpFile = files[0];
                        if (inpFile.type == 'image/jpeg' || inpFile.type == 'image/jpg' || inpFile.type == 'image/png' || inpFile.type == 'image/gif')
                            readUploadedFile(inpFile);
                        else
                            config.alert({ title: "Error", message: "Please select image file" });
                    }
                },
                fileUploaded = function(item, event) {
                    
                    if (config.checkFileApiSupport()) {
                        var input = event.target;
                        var inpFile = input.files[0];
                        if (inpFile.type == 'image/jpeg' || inpFile.type == 'image/jpg' || inpFile.type == 'image/png' || inpFile.type == 'image/gif')
                            readUploadedFile(inpFile);
                        else
                            config.alert({ title: "Error", message: "Please select image file" });
                       
                    } else {
                        requirejs(['lib/fileApi/FileAPI'], function () {
                            var files = FileAPI.getFiles(event);
                            var fileExtension = "";
                            if (files[0].name.lastIndexOf(".") > 0) {
                                fileExtension = files[0].name.substring(files[0].name.lastIndexOf(".") + 1, files[0].name.length).toLowerCase();
                            }
                            if (fileExtension == 'jpeg' || fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'gif')
                                FileAPI.readAsDataURL(files[0], function (dataUrlObject) {
                                    if (dataUrlObject.type == 'load') {
                                        uploadedImage(dataUrlObject.result);
                                    }
                                });
                            else
                                config.alert({ title: "Error", message: "Please select image file" });
                        });
                    }
                },
                show = function () {
                    init().done(function () {
                        if (vectorPad()) {
                            if (typeof (drawPadSvg) != "undefined") {
                                drawPadSvg.clear();
                            }
                        } else {
                            drawPadCanvas.clearDrawAndUploadData();
                            drawPadCanvas.clearCanvas();
                        }
                        uploadedImage(null);
                        isVisible(true);
                    });
                },
                hide = function() {
                    isVisible(false);
                },
                clear = function() {
                    init().done(function() {
                        if (vectorPad())
                            drawPadSvg.clear();
                        else {
                            drawPadCanvas.clearDrawAndUploadData();
                            drawPadCanvas.clearCanvas();
                        }
                    });
                },
                getSignatureData = function() {
                    var signatureData;
                    if (vectorPad())
                        signatureData = drawPadSvg.getSvg();
                    else
                        signatureData = drawPadCanvas.getSignatureImage();
                    return signatureData;
                },
                loadFonts = function () {
                    var notLoaded = [];
                    WebFont.load({
                        google: {
                            families: fontsArray()
                        },
                        loading: function() {
                            fontsLoading(true);
                        },
                        active: function() {
                            fontsLoading(false);
                        },
                        inactive: function() {
                            fontsLoading(false);
                            if (notLoaded.length > 0) {
                                var url = ('https:' == document.location.protocol ? 'https' : 'http') + '://fonts.googleapis.com/css?family=';
                                while (notLoaded.length) {
                                    var fonts = notLoaded.splice(0, 5);
                                    var fontFamilyUrl = url + fonts.join('|').replace(/ /g, '+');
                                    if (document.createStyleSheet)
                                        document.createStyleSheet(fontFamilyUrl);
                                    else {
                                        $("<link/>", {
                                            rel: "stylesheet",
                                            type: "text/css",
                                            href: fontFamilyUrl
                                        }).appendTo("head");
                                    }
                                    var arr = loadedFontsArray();
                                    _.each(fonts,function(element) {
                                        arr[element] = true;
                                    });
                                    loadedFontsArray.valueHasMutated();
                                }
                            }
                        },
                        fontloading: function() {
                        },
                        fontactive: function (font) {
                            var arr = loadedFontsArray();
                            arr[font] = true;
                            loadedFontsArray.valueHasMutated();

                            if (!fontsLoading()) return;

                            var firstThreeLoaded = _.every(_.first(arr, 3), function(val) {
                                return val;
                            });
                            if (firstThreeLoaded && fontsLoading()) {
                                fontsLoading(false);
                            }
                        },
                        fontinactive: function(fontFamily, fontDescription) { // when failed to load font - there is an issue with IE8 - it can't load all fonts at once
                            notLoaded.push(fontFamily);
                            /*
                            return;
                            var url = ('https:' == document.location.protocol ? 'https' : 'http') + '://fonts.googleapis.com/css?family=' + fontFamily.replace(/ /g, '+');
                                
                            if (document.createStyleSheet) {
                                try {
                                    document.createStyleSheet(url);
                                } catch (e) {
                                    fontsArray.remove(fontFamily);
                                } 
                                    
                            } else {
                                $("<link/>", {
                                    rel: "stylesheet",
                                    type: "text/css",
                                    href: url
                                }).appendTo("head");
                            }
                            fontsLoading(false);
                            */
                        }
                    });
                },
                applyDrawSignature = function() {
                    if (!signatureIsValid()) {
                        config.alert({ title: "Error", message: "Please draw the signature" });
                        return false;
                    }
                    var signatureData = getSignatureData();
                    hide();
                    return signatureData;
                },
                init = function () {
                    return $.Deferred(function (def) {
                        if (!forceRasterSignatureCanvas && config.checkBrowserForSvgSupport()) {
                            require(["svgSignaturePad"], function () {
                                drawPadSvg = new signaturePad("#signature-draw-container-" + padIndex(), signatureColor);
                                vectorPad(true);
                            });
                        } else {
                            require(["rasterSignaturePad"], function () {
                                drawPadCanvas = $('#signature-pad-' + padIndex()).signaturePad({ lineTop: 80, drawOnly: true, lineWidth: 0 });
                                vectorPad(false);
                            });
                        }
                        if (initialized) {
                            def.resolve();
                            return;
                        }
                        try {
                            fontsArray(config.fontsArray);
                        } catch(e) { //IE8
                            fontsArray(config.fontsArray);
                        } 
                        var arr = [];
                        _.each(config.fontsArray, function(font) {
                            arr[font] = false;
                        });
                        loadedFontsArray(arr);
                        require(["webfont", "signatureUpload"], function () {
                            initialized = true;
                            loadFonts();
                            def.resolve();
                        });
                        if (!config.checkFileApiSupport()) {
                            $("#dropFilesArea").remove();
                            if (typeof (window.FileAPI) == "undefined") {
                                window.FileAPI = {
                                    debug: false,
                                    cors: false,
                                    media: false,
                                    staticPath: '/scripts/lib/fileApi/',
                                    flashImageUrl: '/scripts/lib/fileApi/FileAPI.flash.image.swf',
                                    postNameConcat: function(name, idx) {
                                        return name + (idx != null ? '[' + idx + ']' : '');
                                    }
                                };
                                requirejs(['lib/fileApi/FileAPI'], function() {});
                            }
                        }
                    });
                };
            return {
                isVisible: isVisible,
                inprogress: inprogress,
                showSelectTab: showSelectTab,
                showSaveButton: showSaveButton,
                showTypeItTab: showTypeItTab,
                showUploadTab: showUploadTab,
                signatures: signatures,
                loadSignatures: loadSignatures,
                saveSignature: saveSignature,
                onPopupShow: onPopupShow,
                fontsArray: fontsArray,
                loadedFontsArray: loadedFontsArray,
                signatureText: signatureText,
                uploadedImage: uploadedImage,
                saveToMySignatures: saveToMySignatures,
                savedSignatureAfterRender: savedSignatureAfterRender,
                createImageFromTypedSignature: createImageFromTypedSignature,
                fileDragged: fileDragged,
                fileUploaded: fileUploaded,
                vectorPad: vectorPad,
                createSvgFromTypedSignature: createSvgFromTypedSignature,
                signatureColor: signatureColor,
                signatureColors: signatureColors,
                activeSignatureColor: activeSignatureColor,
                show: show,
                getSignatureData: getSignatureData,
                clear: clear,
                hide: hide,
                fontsLoading: fontsLoading,
                config: config,
                applyDrawSignature: applyDrawSignature,
                padIndex: padIndex,
                matchWidth: matchWidth,
                expanded: expanded,
                init: init
            };
        }

        return getInstance;
    });
define('core/vm/vm.signatures',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function ($, ko, _, repository, config, redirect) {
        var signatures = ko.observableArray([]),
            inprogress = ko.observable(false),
            totalCount = ko.observable(10),
            page = ko.observable(1),
            itemsPerPage = ko.observable(10),
            name = ko.observable(''),
            loadSignatures = function(options, callback) {
                if (inprogress()) return;
                if (options != null && options.clearAll != null && options.clearAll) {
                    signatures.removeAll();
                    totalCount(0);
                }
                if (options != null && options.page != null)
                    page(options.page);
                if (options != null && options.name != null)
                    name(options.name);
                inprogress(true);
                repository.signature.getSignatures({
                    itemsResult: signatures,
                    itemsCount: totalCount,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        page: page(),
                        count: itemsPerPage(),
                        name: name()
                    },
                    doneCallback: function() {
                        inprogress(false);
                        resizeElements();
                    },
                    errorCallback: errorCallback
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            deleteSignature = function(signature) {
                if (inprogress()) return;
                inprogress(true);
                repository.signature.deleteSignatures({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        signaturesIds: [signature.id()]
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        signatures.remove(signature);
                    },
                    errorCallback:errorCallback
                });
            },
            selectedItems = ko.computed(function () {
                return _.filter(signatures(), function (signature) {
                    return signature.selected() == true;
                });
            }),
            deleteSelected = function () {
                if (inprogress()) return;
                $.confirm({
                    title: "Delete confirmation",
                    message: "Are you sure you want to delete selected signatures?",
                    buttons: {
                        Yes: {
                            'class': "",
                            'action': function () {

                                var signatureIds = [];
                                $.each(selectedItems(), function () {
                                    signatureIds[signatureIds.length] = this.id();
                                });
                                if (signatureIds.length > 0) {
                                    inprogress(true);
                                    repository.signature.deleteSignatures({
                                        param: {
                                            userId: config.userId(),
                                            privateKey: config.privateKey(),
                                            signaturesIds: signatureIds
                                        },
                                        doneCallback: function (result) {
                                            inprogress(false);
                                            if (result.status == 'Ok') {
                                                _.each(signatureIds, function (s) {
                                                    var sig = ko.utils.arrayFirst(signatures(), function (cko) {
                                                        return cko.id() == s;
                                                    });
                                                    signatures.remove(sig);
                                                });
                                            } else {
                                                config.alert("error", result.error_message);
                                            }
                                        },
                                        errorCallback: errorCallback
                                    });
                                }
                            }
                        },
                        No: {}
                    }
                });
            },
            checkAll = function () {
                var newValue = !allSelected();
                _.each(signatures(), function (signature) {
                    signature.selected(newValue);
                });
            },
            allSelected = ko.computed(function () {
                return signatures().length > 0 &&
                    $.grep(signatures(), function (signature) {
                        return signature.selected() == true;
                    }).length == signatures().length;
            }),
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                return false;
            };


        return {
            inprogress: inprogress,
            signatures: signatures,
            totalCount: totalCount,
            itemsPerPage: itemsPerPage,
            page: page,
            loadSignatures: loadSignatures,
            deleteSignature: deleteSignature,
            selectedItems: selectedItems,
            deleteSelected: deleteSelected,
            allSelected: allSelected,
            checkAll: checkAll,
            config: config
        };
    });
define('core/vm/vm.template.prepare',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable(),
            documents = ko.observableArray([]),
            loadTemplate = function (templateId, callback) {
                inprogress(true);
                repository.template.getTemplate({
                    itemsResult: template,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: templateId
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            loadDocuments = function (templateId, callback) {
                inprogress(true);
                documents.removeAll();
                repository.templateDocument.getDocuments({
                    documentResult: documents,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: templateId
                    },
                    doneCallback: function (result) {
                        inprogress(false);                   
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            updateTemplate = function () {
                inprogress(true);
                repository.template.renameTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        name: template().name(),
                    },
                    doneCallback: function (renameResult) {
                        repository.template.updateTemplate({
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey(),
                                templateId: template().id(),
                                name: template().name(),
                                emailBody: template().emailBody(),
                                emailSubject: template().emailSubject(),
                                templateExpireTime: template().templateExpireTime(),
                                orderedSignature: template().orderedSignature(),
                                ownerShouldSign: template().ownerShouldSign(),
                                reminderTime: template().reminderTime(),
                                stepExpireTime: template().stepExpireTime(),
                                waterMarkText: template().waterMarkText(),
                                waterMarkImage: template().waterMarkImage(),
                                enableTypedSignature: template().enableTypedSignature(),
                                enableUploadedSignature: template().enableUploadedSignature(),
                                tags: template().tags()
                            },
                            doneCallback: function (templateResult) {
                                inprogress(false);
                                updateRecipientsOrder(function () {
                                    redirect.templateDashboard();
                                });
                            },
                            errorCallback:errorCallback
                        });
                    }
                });
            },
            updateRecipientsOrder = function (sucessCallback) {

                var $deferreds = [];
                for (var i = 0; i < template().recipients().length; i++) {
                    var recipient = template().recipients()[i];
                    if (recipient.isValid()) {
                        recipient.order(i);
                        $deferreds[i] = $.Deferred(function (def) {

                            repository.templateRecipient.updateRecipient({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    recipientId: recipient.id(),
                                    templateId: template().id,
                                    nickname:recipient.nickname,
                                    roleId: function () {
                                        switch (recipient.roleId()) {
                                            case 1:
                                                return "58416f6827eb612fef7750b62cf2bf9a";
                                            case 2:
                                                return "693e6cee8a4a21285f86930491b455ec";
                                            default:
                                                return "6df1056f4d9a27ec34698552a6372a68";
                                        }
                                    },
                                    order: recipient.order()
                                },
                                successCallback: function (recipientResult) {
                                    def.resolve(recipientResult);
                                },
                                errorCallback: function (error) {
                                    def.reject(error);
                                }
                            });
                        }).promise();
                    }
                }
                $.when.apply(null, $deferreds).then(function () {
                    if (_.isFunction(sucessCallback))
                        sucessCallback();
                });

            },
            cancelPrepare = function () {
                redirect.templateDashboard();
            },
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                return false;
            };
        

        return {
            inprogress: inprogress,
            template: template,
            documents: documents,
            loadTemplate: loadTemplate,
            loadDocuments: loadDocuments,
            updateTemplate: updateTemplate,
            cancelPrepare: cancelPrepare
        };
    });


define('core/vm/vm.template.prepare.step1',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            documents = ko.observableArray([]),
            newName = ko.observable('').extend({ required: { message: config.validationMessages.required } }),
            parseFields = ko.observable(false),
            addDocument = function(templateId, fileId) {
                inprogress(true);
                repository.templateDocument.addDocument({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: templateId,
                        documentId: fileId,
                        parseFields: parseFields(),
                        order: 0
                    },
                    doneCallback: function(documentResult) {
                        inprogress(false);
                        documents.push(documentResult);
                    },
                    errorCallback: errorCallback
                });
            },
            removeDocument = function(templateId, fileId) {
                inprogress(true);
                repository.templateDocument.removeDocument({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: templateId,
                        documentId: fileId,
                        order: 0
                    },
                    doneCallback: function() {
                        inprogress(false);
                        documents.remove($.grep(documents(), function(a) { return a.documentId() == fileId(); })[0]);
                    },
                    errorCallback:errorCallback
                });

            },
            viewDocument = function(fileId) {
                redirect.viewDocument(fileId);
            },
            renameDocument = function (document, callback) {
                if (newName() == '')
                    return;
                repository.templateDocument.renameDocument(document.templateId(), document.documentId(), newName(),
                    function (response) {
                        document.name(response.result.document.name);
                        if (_.isFunction(callback)) {
                            callback(response);
                        }
                    },
                    errorCallback);
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };

        return {
            inprogress: inprogress,
            documents: documents,
            parseFields: parseFields,
            addDocument: addDocument,
            removeDocument: removeDocument,
            viewDocument: viewDocument,
            renameDocument: renameDocument,
            newName: newName
        };
    });


define('core/vm/vm.template.prepare.step2',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable(),
            newRecipient = {
                nickname: ko.escapedObservable('').extend({ required: { message: config.validationMessages.required }, maxLength: { params: 100, message: 'Name too long' } }),
                role: ko.observable(2)
            },
            addOwnerAsRecipient = function(callback) {
                inprogress(true);
                repository.template.updateTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        emailBody: template().emailBody(),
                        emailSubject: template().emailSubject(),
                        templateExpireTime: template().templateExpireTime(),
                        orderedSignature: template().orderedSignature(),
                        ownerShouldSign: true,
                        reminderTime: template().reminderTime(),
                        stepExpireTime: template().stepExpireTime(),
                        waterMarkText: template().waterMarkText(),
                        waterMarkImage: template().waterMarkImage(),
                        enableTypedSignature: template().enableTypedSignature(),
                        enableUploadedSignature: template().enableUploadedSignature(),
                        tags: template().tags()
                    },
                    doneCallback: function(result) {
                        inprogress(false);
                        template().ownerShouldSign(true);
                        template().recipients.push($.grep(result.recipients(), function (a) { return a.roleId() == 1; })[0]);
                        if (_.isFunction(callback)) {
                            callback(result);
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            addRecipient = function (recipient, callback) {
                if (inprogress() == true)
                    return;
                var recipientToBeAdded;
                if (recipient != null) {
                    recipientToBeAdded = recipient;
                } else {
                    recipientToBeAdded = newRecipient;
                }
                if (!recipientToBeAdded.isValid()) {
                    recipientToBeAdded.errors.showAllMessages(true);
                    return;
                }

                inprogress(true);
                repository.templateRecipient.addRecipient({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id,
                        nickname: recipientToBeAdded.nickname(),
                        roleId: function () {
                            switch (newRecipient.role()) {
                                case 1:
                                    return "58416f6827eb612fef7750b62cf2bf9a";
                                case 2:
                                    return "693e6cee8a4a21285f86930491b455ec";
                                default:
                                    return "6df1056f4d9a27ec34698552a6372a68";
                            }
                        },
                        order: 0
                    },
                    successCallback: function (recipientResult) {
                        inprogress(false);
                        template().recipients.push(recipientResult);
                        newRecipient.nickname('');
                        newRecipient.role(2);
                        newRecipient.errors.showAllMessages(false);
                        if (_.isFunction(callback)) {
                            callback(recipientResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            removeRecipient = function (recipient, callback) {
                inprogress(true);
                if (recipient.roleId() == 1) {
                    repository.template.updateTemplate({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            templateId: template().id(),
                            emailBody: template().emailBody(),
                            emailSubject: template().emailSubject(),
                            templateExpireTime: template().templateExpireTime(),
                            orderedSignature: template().orderedSignature(),
                            ownerShouldSign: false,
                            reminderTime: template().reminderTime(),
                            stepExpireTime: template().stepExpireTime(),
                            waterMarkText: template().waterMarkText(),
                            waterMarkImage: template().waterMarkImage(),
                            enableTypedSignature: template().enableTypedSignature(),
                            enableUploadedSignature: template().enableUploadedSignature(),
                            tags: template().tags()
                        },
                        doneCallback: function (result) {
                            inprogress(false);
                            template().ownerShouldSign(false);
                            template().recipients.remove($.grep(template().recipients(), function (a) { return a.roleId() == 1; })[0]);
                            if (_.isFunction(callback)) {
                                callback(result);
                            }
                        }
                    });
                } else {
                    repository.templateRecipient.removeRecipient({
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            templateId: template().id,
                            recipientId: recipient.id()
                        },
                        successCallback: function (result) {
                            inprogress(false);
                            template().recipients.remove($.grep(template().recipients(), function (a) { return a.id() == recipient.id(); })[0]);
                            if (_.isFunction(callback)) {
                                callback(result);
                            }
                        },
                        errorCallback:errorCallback
                    });
                }
            },
            updateRecipient = function (recipient, callback) {
                if (!recipient.isValid()) {
                    recipient.errors.showAllMessages(true);
                    return;
                }
                inprogress(true);
                repository.templateRecipient.updateRecipient({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id,
                        recipientId: recipient.id(),
                        nickname: recipient.nickname(),
                        roleId: function () {
                            switch (recipient.roleId()) {
                                case 1:
                                    return "58416f6827eb612fef7750b62cf2bf9a";
                                case 2:
                                    return "693e6cee8a4a21285f86930491b455ec";
                                default:
                                    return "6df1056f4d9a27ec34698552a6372a68";
                            }
                        },
                        order: recipient.order()
                    },
                    successCallback: function (recipientResult) {
                        inprogress(false);
                        recipient.errors.showAllMessages(false);
                        if (_.isFunction(callback)) {
                            callback(recipientResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };

        ko.validation.group(newRecipient);
        
        return {
            inprogress: inprogress,
            template: template,
            newRecipient: newRecipient,
            addOwnerAsRecipient: addOwnerAsRecipient,
            addRecipient: addRecipient,
            removeRecipient: removeRecipient,
            updateRecipient: updateRecipient
        };
    });


define('core/vm/vm.template.prepare.step3',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable();


        return {
            inprogress: inprogress,
            template: template
        };
    });


define('core/vm/vm.template.prepare.step4',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable();

        return {
            inprogress: inprogress,
            template: template
        };
    });


define('core/vm/vm.template.prepare.step5',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, configuration, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable(),
            documents = ko.observableArray([]),
            viewerAction = 'prepare',
            config = configuration,
            signatureFields = ko.observableArray([]),
            fields = ko.observableArray([]),
            previewDocument = ko.observable(),
            previewRecipient = ko.observable(),
            pageWidth = ko.observable(850),
            pageHeight = ko.observable(1200),
            timer,
            cuttedLocation = ko.observable(),
            copiedLocation = ko.observable(),
            cuttedField = ko.observable(),
            copiedField = ko.observable(),
            selectedField = ko.observable(),
            selectedLocation = ko.observable(),
            predefinedLists = ko.observableArray([]),
            selectedPredefinedList = ko.observable(),
            newAcceptableValue = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            newAcceptableValueListName = ko.escapedObservable('').extend({ required: { message: config.validationMessages.required } }),
            regularExpressions = ko.computed(function () {
                if (selectedField() != null && (selectedField().fieldType() == configuration.signatureFieldType.SingleLine || selectedField().fieldType() == configuration.signatureFieldType.SingleLine || selectedField().fieldType() == configuration.signatureFieldType.Date)) {
                    return configuration.fieldValidations.filter(function (item) {
                        return $.grep(item.fieldType.split(','), function (e) { return e == selectedField().fieldType(); })[0] != null;
                    });
                } else
                    return [];
            }),
            recipientsToSign = ko.computed(function () {
                try {
                    return ko.utils.arrayFilter(template().recipients(), function (recipient) {
                        return recipient.roleId() != 3;
                    });
                } catch (e) {
                    return [];
                }
            }),
            init = function (callback) {
                inprogress(true);
                repository.field.getFields({
                    itemsResult: signatureFields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey()
                    },
                    doneCallback: function (fieldsResult) {
                        repository.predefinedList.getPredefinedLists({
                            itemsResult: predefinedLists,
                            param: {
                                userId: config.userId(),
                                privateKey: config.privateKey()
                            },
                            doneCallback: function (listsResult) {
                                inprogress(false);
                                if (_.isFunction(callback)) {
                                    callback(fieldsResult, listsResult);
                                }
                            },
                            errorCallback: errorCallback
                        });
                    },
                    errorCallback: errorCallback
                });


            },
            isOwnField = function (field) {
                return previewRecipient() != null ? field.recipientId() == previewRecipient().id() : false;
            },
            getRecipientNameById = function (recipientId) {
                if (template() != null && template().recipients().length > 0) {
                    return $.grep(template().recipients(), function (r) {
                        return r.id() == recipientId;
                    })[0].fullName();
                }
                return '';
            },
            addField = function (fieldId, pageNum, relativeX, relativeY, locationHeight, locationWidth, forceNewField, fieldName) {
                inprogress(true);
                repository.templateField.addField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        documentId: previewDocument().documentId(),
                        recipientId: previewRecipient().id(),
                        fieldId: fieldId,
                        forceNewField: forceNewField,
                        page: pageNum,
                        locationX: relativeX,
                        locationY: relativeY,
                        locationHeight: locationHeight,
                        locationWidth: locationWidth,
                        name: fieldName,
                        pageWidth: pageWidth(),
                        pageHeight: pageHeight()
                    },
                    successCallback: function (fieldResult) {
                        inprogress(false);
                        fieldResult.locations.remove(function (item) {
                            return item.documentId() != previewDocument().documentId();
                        });
                        if (forceNewField && !_.find(fields(), function (a) { return a.id() == fieldResult.id(); })) {
                            fields.push(fieldResult);
                            var document = $.grep(documents(), function (d) { return d.documentId() == fieldResult.locations()[0].documentId(); })[0];
                            document.fieldsCount(document.fieldsCount() + 1);
                        } else {
                            $.grep(fields(), function (a) { return a.id() == fieldResult.id(); })[0].locations.push(fieldResult.locations.pop());
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            updateFieldLocation = function (location, callback) {
                if (!location) return;
                inprogress(true);
                repository.templateField.updateFieldLocation({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        documentId: previewDocument().documentId(),
                        recipientId: previewRecipient().id(),
                        locationId: location.id(),
                        fieldId: location.fieldId(),
                        page: location.page(),
                        locationX: location.locationX(),
                        locationY: location.locationY(),
                        locationHeight: location.locationHeight(),
                        locationWidth: location.locationWidth(),
                        fontBold: location.fontBold(),
                        fontColor: location.fontColor(),
                        fontItalic: location.fontItalic(),
                        fontName: location.fontName(),
                        fontSize: location.fontSize(),
                        fontUnderline: location.fontUnderline(),
                        align: location.align(),
                        pageWidth: pageWidth(),
                        pageHeight: pageHeight()
                    },
                    successCallback: function (fieldResult) {
                        inprogress(false);
                        location.dirtyFlag().reset();
                        var fld = _.find(fields(), function (f) {
                            return f.id() == location.fieldId();
                        });
                        if (fld && fld.recipientId() != previewRecipient().id()) {
                            inprogress(true);
                            repository.templateField.assignField({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    templateId: template().id(),
                                    documentId: previewDocument().documentId(),
                                    currentRecipientId: previewRecipient().id(),
                                    newRecipientId: fld.recipientId(),
                                    fieldId: location.fieldId()
                                },
                                successCallback: function (assignedFieldResult) {
                                    inprogress(false);
                                },
                                errorCallback: errorCallback
                            });
                        }
                        if (_.isFunction(callback)) {
                            callback(fieldResult);
                        }
                    },
                    errorCallback: function (error) {
                        inprogress(false);
                        config.alert({ title: "Error", message: error });
                        getDocumentFields(previewDocument().documentId());
                        if (_.isFunction(callback)) {
                            callback(false);
                        }
                    }
                });
            },
            isValidDate = function (s) {
                if (!s || s.length == 0) return true;
                if (s.length != 10) return false;
                var bits = s.split('.');
                if (!bits[0] || !bits[1] || !bits[2]) return false;
                if (bits[2] < 1900 || bits[2] > 2100) return false;
                var d = new Date(bits[2], bits[1] - 1, bits[0]);
                return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
            },
            updateField = function (field, callback) {
                if (!location) return;
                if (field.fieldType() == config.signatureFieldType.Date) {
                    if (!field.settings().minYear.isValid() || !field.settings().maxYear.isValid()) {
                        config.alert({ title: "Field not saved", message: 'Invalid date settings' });
                        return;
                    }
                }
                if (!field.isValid()) {
                    config.alert({ title: "Field not saved", message: 'Field data is not valid' });
                    return;
                }
                if (field.fieldType() > 1 && field.fieldType() < 5 && field.defaultValue() != '') {
                    if (field.regularExpression() != null && !field.defaultValue().match(field.regularExpression())) {
                        config.alert({ title: "Field not saved", message: 'Default value is not valid' });
                        return;
                    }
                    if (field.fieldType() == 4 && field.regularExpression() == null && !isValidDate(field.defaultValue())) {
                        config.alert({ title: "Field not saved", message: 'Default date is not valid' });
                        return;
                    }
                }
                inprogress(true);
                repository.templateField.updateField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        documentId: previewDocument().documentId(),
                        recipientGuid: previewRecipient().id(),
                        fieldId: field.id(),
                        name: field.name(),
                        regularExpression: field.regularExpression(),
                        order: field.order(),
                        mandatory: field.mandatory(),
                        acceptableValues: field.acceptableValues(),
                        defaultValue: field.defaultValue(),
                        tooltip: field.tooltip(),
                        guidanceText: field.guidanceText(),
                        groupName: field.groupName(),
                        fieldType: field.fieldType(),
                        settings: ko.toJSON(field.settings())
                    },
                    successCallback: function (fieldResult) {
                        inprogress(false);
                        field.dirtyFlag().reset();
                        if (_.isFunction(callback)) {
                            callback(fieldResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            deleteFieldLocation = function (field, location) {
                inprogress(true);
                repository.templateField.deleteFieldLocation({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template().id(),
                        fieldId: location.fieldId(),
                        locationId: location.id()
                    },
                    successCallback: function () {
                        inprogress(false);
                        field.locations.remove(location);
                        if (field.locations().length == 0) {
                            fields.remove(field);
                            var document = $.grep(documents(), function (d) { return d.documentId() == location.documentId(); })[0];
                            document.fieldsCount(document.fieldsCount() - 1);
                        }
                        selectedField(null);
                        selectedLocation(null);
                    },
                    errorCallback: errorCallback
                });
            },
            updateMovedField = function (location, event) {
                if (!location.selected()) return;
                clearInterval(timer);
                timer = setTimeout(function () {
                    if (event.keyCode > -37 && event.keyCode <= 40)
                        updateFieldLocation(location);
                }, 2000);
            },
            getDocumentFields = function (documentId, callback) {
                inprogress(true);
                fields.removeAll();
                selectedField(null);
                selectedLocation(null);
                repository.templateField.getFields({
                    itemsResult: fields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        templateId: template().id(),
                        documentId: documentId
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                        var document = ko.utils.arrayFirst(documents(), function (doc) {
                            return doc.documentId() === documentId;
                        });
                       // document.fields.removeAll();
                        ko.utils.arrayForEach(fieldsResult, function (docField) {
                            docField.locations.remove(function (item) {
                                return item.documentId() != documentId;
                            });
                        });
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                       
                    },
                    errorCallback: errorCallback
                });
            },
            getDocumentField = function (documentId, fieldId, callback) {
                inprogress(true);
                repository.templateField.getField({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        templateId: template().id(),
                        documentId: documentId,
                        fieldId: fieldId
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                        fieldsResult.locations.remove(function (item) {
                            return item.documentId() != documentId;
                        });
                        var field = ko.utils.arrayFirst(fields(), function (f) {
                            return f.id() === fieldId;
                        });
                        fields.replace(field, fieldsResult);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            copyFieldLocation = function (field, location) {
                if (location.selected()) {
                    copiedLocation(location);
                    copiedField(field);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            cutFieldLocation = function (field, location) {
                if (location.selected()) {
                    if (field == null) return;
                    cuttedLocation(location);
                    cuttedField(field);
                    copiedLocation(null);
                    copiedField(null);
                    field.locations.remove(location);
                }
            },
            pasteNewField = function () {
                if (copiedLocation() != null && copiedField() != null) {
                    var signatureCopiedField = $.grep(signatureFields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), true, '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var signatureCuttedField = $.grep(signatureFields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX(), cuttedLocation().locationY(), cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), true, '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            pasteNewLocation = function () {
                if (copiedLocation() != null && copiedField() != null) {
                    var templateCopiedField = $.grep(fields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    var signatureCopiedField = $.grep(signatureFields(), function (a) { return a.fieldType() == copiedField().fieldType(); })[0];
                    addField(templateCopiedField != null ? copiedLocation().fieldId() : signatureCopiedField.id(), copiedLocation().page(), copiedLocation().locationX() + 0.05, copiedLocation().locationY() + 0.05, copiedLocation().locationHeight(), copiedLocation().locationWidth(), templateCopiedField != null ? false : true, templateCopiedField != null ? copiedField().name() : '');
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
                if (cuttedLocation() != null && cuttedField() != null) {
                    var templateCuttedField = $.grep(fields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    var signatureCuttedField = $.grep(signatureFields(), function (a) { return a.fieldType() == cuttedField().fieldType(); })[0];
                    addField(templateCuttedField != null ? cuttedLocation().fieldId() : signatureCuttedField.id(), cuttedLocation().page(), cuttedLocation().locationX() + 0.05, cuttedLocation().locationY() + 0.05, cuttedLocation().locationHeight(), cuttedLocation().locationWidth(), templateCuttedField != null ? false : true, templateCuttedField != null ? cuttedField().name() : '');
                    deleteFieldLocation(cuttedField(), cuttedLocation());
                    copiedLocation(null);
                    copiedField(null);
                    cuttedLocation(null);
                    cuttedField(null);
                }
            },
            addFieldFromMenu = function (fieldType) {
                var signatureField = $.grep(signatureFields(), function (a) { return a.fieldType() == fieldType; })[0];
                var height, width;
                switch (fieldType) {
                    case 1:
                        //signature
                        height = 46;
                        width = 148;
                        break;
                    case 6:
                        //checkbox
                        height = 25;
                        width = 25;
                        break;
                    default:
                        height = 25;
                        width = 205;
                        break;
                }
                addField(signatureField.id(), 1, 0, 0, height, width, true, '');
            },
            selectDefaultValue = function (value) {
                if (selectedField() != null)
                    selectedField().defaultValue(value);
            },
            addAcceptableValue = function () {
                newAcceptableValue($.trim(newAcceptableValue()));
                if ($.grep(newAcceptableValue.errors(), function (error) {
                    return error != null;
                }
                ).length > 0) {
                    newAcceptableValue.errors.showAllMessages(true);
                    return;
                }
                ;
                if (selectedField() != null && newAcceptableValue() != '') {
                    if (selectedField().acceptableValuesArray().indexOf(newAcceptableValue()) > -1) {
                        config.alert({ title: "Error", message: "Value already in list" });
                        return;
                    }
                    selectedField().acceptableValuesArray.push(newAcceptableValue());
                    newAcceptableValue('');
                    selectedPredefinedList(null);
                    newAcceptableValue.errors.showAllMessages(false);
                }
            },
            deleteAcceptableValue = function (value) {
                $.confirm({
                    title: "Delete Confirmation",
                    message: "Are you sure ?",
                    buttons: {
                        Yes: {
                            action: function () {
                                selectedField().acceptableValuesArray.remove(value);
                                if (selectedField().defaultValue() == value)
                                    selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            },
            addNewAcceptableValuesList = function () {
                if ($.grep(newAcceptableValueListName.errors(), function (error) {
                    return error != null;
                }
                ).length > 0) {
                    newAcceptableValueListName.errors.showAllMessages(true);
                    return;
                }
                ;
                if (selectedField() != null && newAcceptableValueListName() != '') {
                    inprogress(true);
                    repository.predefinedList.addList({
                        itemsResult: predefinedLists,
                        param: {
                            userId: config.userId(),
                            privateKey: config.privateKey(),
                            name: newAcceptableValueListName(),
                            defaultValue: selectedField().defaultValue(),
                            values: selectedField().acceptableValues()
                        },
                        successCallback: function (result) {
                            inprogress(false);
                            predefinedLists.push(result);
                        },
                        errorCallback: errorCallback
                    });
                    newAcceptableValueListName('');
                    newAcceptableValueListName.errors.showAllMessages(false);
                }
            },
            deleteAcceptableValuesList = function () {
                if (selectedPredefinedList() == null) return;
                inprogress(true);
                repository.predefinedList.deleteList({
                    itemsResult: predefinedLists,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        listId: selectedPredefinedList().id()
                    },
                    successCallback: function (result) {
                        inprogress(false);
                        var selected = selectedPredefinedList();
                        selectedPredefinedList(null);
                        predefinedLists.remove(selected);
                    },
                    errorCallback: function (error) {
                        config.alert({ title: "error", message: error });
                    }
                });
            },
            resetFields = function () {
                inprogress(true);
                repository.templateField.getFields({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        templateId: template().id(),
                        documentId: ""
                    },
                    successCallback: function (fieldsResult) {
                        var fieldIds = [];
                        $.each(fieldsResult, function () {
                            fieldIds[fieldIds.length] = this.id();
                        });
                        if (fieldIds.length > 0) {
                            repository.templateField.deleteFields({
                                param: {
                                    userId: config.userId(),
                                    privateKey: config.privateKey(),
                                    templateId: template().id(),
                                    fieldIds: fieldIds
                                },
                                successCallback: function (result) {
                                    inprogress(false);
                                    fields.removeAll();
                                    selectedField(null);
                                    selectedLocation(null);
                                },
                                errorCallback: errorCallback
                            });
                        }
                    },
                    errorCallback:errorCallback
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };
        
        selectedPredefinedList.subscribe(function (newValue) {
            if (newValue != null) {
                $.confirm({
                    title: "Apply list confirmation",
                    message: "Are you sure that you apply the selected list?",
                    buttons: {
                        Yes: {
                            action: function () {
                                selectedField().acceptableValuesArray(newValue.values());
                                selectedField().defaultValue('');
                            }
                        },
                        No: {}
                    }
                });
            }
        });
        ko.validation.group(newAcceptableValue);
        ko.validation.group(newAcceptableValueListName);


        return {
            inprogress: inprogress,
            documents: documents,
            template: template,
            viewerAction: viewerAction,
            config: config,
            regularExpressions: regularExpressions,
            signatureFields: signatureFields,
            fields: fields,
            previewDocument: previewDocument,
            previewRecipient: previewRecipient,
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            cuttedLocation: cuttedLocation,
            copiedLocation: copiedLocation,
            cuttedField: cuttedField,
            copiedField: copiedField,
            selectedField: selectedField,
            selectedLocation: selectedLocation,
            predefinedLists: predefinedLists,
            selectedPredefinedList: selectedPredefinedList,
            newAcceptableValue: newAcceptableValue,
            newAcceptableValueListName: newAcceptableValueListName,
            init: init,
            isOwnField: isOwnField,
            addField: addField,
            updateFieldLocation: updateFieldLocation,
            updateField: updateField,
            deleteFieldLocation: deleteFieldLocation,
            updateMovedField: updateMovedField,
            getDocumentFields: getDocumentFields,
            getDocumentField: getDocumentField,
            copyFieldLocation: copyFieldLocation,
            cutFieldLocation: cutFieldLocation,
            pasteNewField: pasteNewField,
            pasteNewLocation: pasteNewLocation,
            addFieldFromMenu: addFieldFromMenu,
            selectDefaultValue: selectDefaultValue,
            addAcceptableValue: addAcceptableValue,
            deleteAcceptableValue: deleteAcceptableValue,
            addNewAcceptableValuesList: addNewAcceptableValuesList,
            resetFields: resetFields,
            getRecipientNameById: getRecipientNameById,
            recipientsToSign: recipientsToSign,
            deleteAcceptableValuesList: deleteAcceptableValuesList
        };
    });


define('core/vm/vm.template.prepare.step6',
    ['ko',
    'lib/underscore',
    'core/repository',
    'core/config',
    'core/redirect'],
    function (ko, _, repository, config, redirect) {
        var inprogress = ko.observable(false),
            template = ko.observable(),
            documents = ko.observableArray([]),
            fields = ko.observableArray([]),
            loadFields = function (callback) {
                if (inprogress()) return;
                inprogress(true);
                fields.removeAll();
                repository.templateField.getFields({
                    itemsResult: fields,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        recipientId: "",
                        templateId: template().id(),
                        documentId: ""
                    },
                    successCallback: function (fieldsResult) {
                        inprogress(false);
                        if (_.isFunction(callback)) {
                            callback(fieldsResult);
                        }
                    },
                    errorCallback: errorCallback
                });
            },
            getFields = function (recipient, document) {
                return ko.utils.arrayFilter(fields(), function (item) {
                    return $.grep(item.locations(), function (location) {
                        return location.documentId() == document.documentId();
                    }).length > 0 && item.recipientId() == recipient.id();
                });
            },
            errorCallback = function (error) {
                inprogress(false);
                config.alert({ title: "Error", message: error });
                return false;
            };


        return {
            inprogress: inprogress,
            template: template,
            documents: documents,
            fields: fields,
            loadFields: loadFields,
            getFields: getFields
        };
    });


define('core/vm/vm.templates',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/repository',
        'core/config',
        'core/redirect'],
    function($, ko, _, repository, config, redirect) {
        var templates = ko.observableArray([]),
            inprogress = ko.observable(false),
            totalCount = ko.observable(10),

            page = ko.observable(1),
            itemsPerPage = ko.observable(10),
            documentGuid= ko.observable(''),
            recipientName = ko.observable(''),
            name = ko.observable(''),
            tag = ko.observable(''),


            loadTemplates = function(options, callback) {
                if (inprogress()) return;
                if (options != null && options.clearAll != null && options.clearAll) {
                    templates.removeAll();
                    totalCount(0);
                }
                if (options != null && options.page != null)
                    page(options.page);
                if (options != null && options.recipientName != null)
                    recipientName(options.recipientName);
                if (options != null && options.documentId != null)
                    documentGuid(options.documentId);
                if (options != null && options.name != null)
                    name(options.name);
                if (options != null && options.tag != null)
                    tag(options.tag);
                inprogress(true);
                repository.template.getTemplates(
                    function (itemsResult, itemsCount) {
                        inprogress(false);
                        ko.utils.arrayPushAll(templates, itemsResult);
                        totalCount(itemsCount);
                        resizeElements();
                    },
                    errorCallback, page(),itemsPerPage(),documentGuid(),recipientName(),name(), tag()
                );

                if (_.isFunction(callback)) {
                    callback();
                }
            },
            createTemplate = function () {
                if (inprogress()) return;
                inprogress(true);
                repository.template.createTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New template"
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        redirect.templateView(result.template.id);
                    },
                    errorCallback: errorCallback
                });
            },
            openTemplate = function(template) {
                redirect.templateView(template.id());
            },
            deleteTemplate = function (template) {
                if (inprogress()) return;
                inprogress(true);
                repository.template.deleteTemplates({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templatesIds: [template.id()]
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        templates.remove(template);
                    },
                    errorCallback: errorCallback
                });
            },
            createEnvelopeFromTemplate = function(template) {
                if (inprogress()) return;
                inprogress(true);
                repository.envelope.createEnvelope({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: template.id(),
                        envelopeId: "",
                        name: "New envelope"
                    },
                    doneCallback: function (result) {
                        inprogress(false);
                        redirect.envelopeView(result.envelope.id);
                    },
                    errorCallback: errorCallback
                });
            },
            createFormFromTemplate = function (template) {
                if (inprogress()) return;
                inprogress(true);
                repository.form.createForm(
                    doneCallback = function (result) {
                        inprogress(false);
                        redirect.formView(result.form.id);
                    },
                    errorCallback, 'New Form', template.id()
                );
            },
            createTemplateFromDocument = function (documents) {
                if (inprogress()) return;
                inprogress(true);
                repository.template.createTemplate({
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey(),
                        templateId: "",
                        envelopeId: "",
                        name: "New template"
                    },
                    doneCallback: function (templateResult) {
                        inprogress(false);
                        var $deferreds = [];
                        for (var i = 0; i < documents.length; i++) {
                            $deferreds[i] = $.Deferred(function(def) {
                                repository.templateDocument.addDocument({
                                    param: {
                                        userId: config.userId(),
                                        privateKey: config.privateKey(),
                                        templateId: templateResult.template.id,
                                        documentId: documents[i],
                                        parseFields: false,
                                        order: 0
                                    },
                                    doneCallback: function(documentResult) {
                                        def.resolve(documentResult);
                                    },
                                    errorCallback: function(error) {
                                        def.reject(error);
                                    }
                                });
                            }).promise();
                        }
                        $.when.apply(null, $deferreds).then(function () {
                            redirect.templateView(templateResult.template.id);
                        });
                    },
                    errorCallback:errorCallback
                });
            },
            selectedItems = ko.computed(function () {
                return _.filter(templates(), function (template) {
                    return template.selected() == true;
                });
            }),
            deleteSelected = function () {
                if (inprogress()) return;
                $.confirm({
                    title: "Delete confirmation",
                    message: "Are you sure you want to delete selected templates?",
                    buttons: {
                        Yes: {
                            'class': "",
                            'action': function () {

                                var templateIds = [];
                                $.each(selectedItems(), function () {
                                    templateIds[templateIds.length] = this.id();
                                });
                                if (templateIds.length > 0) {
                                    inprogress(true);
                                    repository.template.deleteTemplates({
                                        param: {
                                            userId: config.userId(),
                                            privateKey: config.privateKey(),
                                            templatesIds: templateIds
                                        },
                                        doneCallback: function (result) {
                                            inprogress(false);
                                            if (result.status == 'Ok') {
                                                _.each(templateIds, function (t) {
                                                    var tpl = ko.utils.arrayFirst(templates(), function (template) {
                                                        return template.id() == t;
                                                    });
                                                    templates.remove(tpl);
                                                });
                                            } else {
                                                config.alert("error", result.error_message);
                                            }
                                        },
                                        errorCallback: errorCallback
                                    });
                                }
                            }
                        },
                        No: {}
                    }
                });
            },
            checkAll = function () {
                var newValue = !allSelected();
                _.each(templates(), function (template) {
                    template.selected(newValue);
                });
            },
            allSelected = ko.computed(function () {
                return templates().length > 0 &&
                    $.grep(templates(), function (template) {
                        return template.selected() == true;
                    }).length == templates().length;
            }),
            errorCallback = function (error) {
                config.alert({ title: "Error", message: error });
                return false;
            };


        return {
            inprogress: inprogress,
            templates: templates,
            totalCount: totalCount,
            itemsPerPage: itemsPerPage,
            page: page,
            loadTemplates: loadTemplates,
            createTemplate: createTemplate,
            openTemplate: openTemplate,
            deleteTemplate: deleteTemplate,
            createEnvelopeFromTemplate: createEnvelopeFromTemplate,
            createFormFromTemplate: createFormFromTemplate,
            createTemplateFromDocument: createTemplateFromDocument,
            selectedItems: selectedItems,
            deleteSelected: deleteSelected,
            allSelected: allSelected,
            checkAll: checkAll
        };
    });
define('core/vm/vm.templates.resources',
    ['ko', 'lib/underscore', 'core/repository', 'core/config'],
    function (ko, _, repository, config) {
        var inprogress = ko.observable(false),
            resources = ko.observableArray([]),
            selectedDocument = ko.observable(),
            selectedRecipient = ko.observable(),
            selectedTag = ko.observable(),
            dashboardInprogress = ko.observable(),
            loadResources = function (callback) {
                if (inprogress()) return;
                inprogress(true);
                repository.templateResource.getResources({
                    resourcesResult: resources,
                    param: {
                        userId: config.userId(),
                        privateKey: config.privateKey()
                    },
                    doneCallback: function () {
                        inprogress(false);
                    }
                });

                if (_.isFunction(callback)) {
                    callback();
                }
            };
        return {
            inprogress: inprogress,
            loadResources: loadResources,
            resources: resources,
            selectedDocument: selectedDocument,
            selectedRecipient: selectedRecipient,
            dashboardInprogress: dashboardInprogress,
            selectedTag: selectedTag
        };
    });
define('core/vm/vm.uploadprogress',
    ['jquery',
        'ko',
        'core/repository',
        'core/config'
    ],
    function($, ko, repository, config) {

        var uploadingFiles = ko.observableArray([]),
            addFileUploadInfo = function (fileId, fileName) {
                var fileUplInfo = {
                    id: fileId,
                    sizeInKb: ko.observable(0),
                    percentCompleted: ko.observable(0),
                    uploadSpeed: ko.observable(0),
                    remainingTime: ko.observable(0),
                    name: fileName
                };
                uploadingFiles.push(fileUplInfo);
            },
            removeFileUploadInfo = function(id) {
                var item = ko.utils.arrayFirst(uploadingFiles(), function(item) { return item.id === id; });
                uploadingFiles.remove(item);

            },
            doProgress = function (id,  loaded, total, bytesPerMSec, remainTime) {
                if (total > 0) {
                    var fileUplInfo = ko.utils.arrayFirst(uploadingFiles(), function (item) { return item.id === id; });
                    fileUplInfo.percentCompleted(Math.round(loaded / total * 100));
                    fileUplInfo.uploadSpeed(Math.round(bytesPerMSec / (1024 / 1000)));
                    fileUplInfo.remainingTime(Math.round(remainTime / 1000));
                }
            },
            currentFilesCount=ko.computed(function() {
                return uploadingFiles().length;
            }),
            init = function() {
                
            };
            
        init();

        return {
            init: init,
            uploadingFiles: uploadingFiles,
            addFileUploadInfo: addFileUploadInfo,
            removeFileUploadInfo: removeFileUploadInfo,
            currentFilesCount: currentFilesCount,
            doProgress: doProgress
        };
    });
define('core/vm/vm.verify',
    ['jquery',
        'ko',
        'lib/underscore',
        'core/utils'
    ],
    function ($, ko,_,utils) {
        var progressVisible = ko.observable(false),
            successVisible = ko.observable(false),
            failVisible = ko.observable(false),
            percentCompleted = ko.observable(0),
            recipients = ko.observableArray([]),
            dates = ko.observableArray([]),
            references = ko.observableArray([]),
            filesInUpload = ko.observableArray([]),
            uploadDialogVisible = ko.observable(false),
            resetResultDialgos = function() {
                progressVisible(false);
                successVisible(false);
                failVisible(false);
                
            },
            doOnKeyUp = function(event) {
                if (!progressVisible()) return true;
                var keyCode = (event.which ? event.which : event.keyCode);
                if (keyCode === 27) {
                    uploadDialogVisible(false);
                    resetResultDialgos();
                    return false;
                }
                return true;
            },
            loadData = function (dto) {
                resetResultDialgos();
                recipients.removeAll();
                dates.removeAll();
                references.removeAll();
                if (dto.code == 'Ok' && dto.authentic) {
                    if (dto.recipients) {
                        _.each(dto.recipients, function(recip) {
                            recipients.push(recip.Name);
                        });
                    }
                    if (dto.datesSigned) {
                        _.each(dto.datesSigned, function(date) {
                            dates.push(utils.dateFromIso(date).format('mmm dd yyyy hh:MM:ss'));
                        });
                    }
                    if (dto.references) {
                        _.each(dto.references, function(reference) {
                            references.push(reference);
                        });
                    }
                    successVisible(true);
                } else {
                    failVisible(true);
                }
            },
            //upload dialog properties
            cancelUpload = function() {
            },
            closeDialog = function () {
                uploadDialogVisible(false);
            },
            onDialogShow = function () {
            };
        return {
            progressVisible: progressVisible,
            doOnKeyUp: doOnKeyUp,
            percentCompleted: percentCompleted,
            recipients: recipients,
            dates: dates,
            references: references,
            loadData: loadData,
            successVisible:successVisible,
            failVisible: failVisible,
            cancelUpload: cancelUpload,
            filesInUpload: filesInUpload,
            uploadDialogVisible: uploadDialogVisible,
            closeDialog: closeDialog,
            onDialogShow: onDialogShow
        };
    });
define('core/vm/vm.viewer',
    ['jquery',
        'ko',
        'core/repository',
        'core/config'
    ],
    function($, ko, repository, config) {
        function getInstance(viewerContainer, viewerOptions) {
            var options = {
                fileId: "",
                userId: config.userId(),
                privateKey: config.privateKey(),
                userKey: config.privateKey(),
                baseUrl: config.serviceAddress() + "/shared/",
                quality: 80,
                use_pdf: 'false',
                serviceUrl: config.serviceAddress(),
                _mode: "full",
                usePageNumberInUrlHash: false,
                variableHeightPageSupport: false
            },
                viewerAdapter = null,
                signatureBackgroundSvg = ko.observable(),
                stampBackgroundSvg = ko.observable(),
                init = function () {
                    repository.resources.getSignatureBackgroundSvg().done(function(data) {
                        signatureBackgroundSvg(data);
                    });
                    repository.resources.getStampBackgroundSvg().done(function (data) {
                        stampBackgroundSvg(data);
                    });
                },
                adapter = function(mode) {
                    if (viewerAdapter == null) {
                        if (mode)
                            options._mode = mode;                        

                        if (viewerContainer !== undefined) {
                            if (viewerOptions !== undefined && viewerOptions.docSpace !== undefined)
                                options.docSpace = viewerOptions.docSpace;
                            else
                                options.docSpace = $(viewerContainer).find('.document_viewer');
                            if (viewerOptions !== undefined && viewerOptions.navigation !== undefined)
                                options.navigation = viewerOptions.navigation;
                            else
                                options.navigation = $(viewerContainer).find('#viewer-navigation');
                            if (viewerOptions !== undefined && viewerOptions.zooming !== undefined)
                                options.zooming = viewerOptions.zooming;
                            else
                                options.zooming = $(viewerContainer).find('#viewer-zoom');
                            if (viewerOptions !== undefined && viewerOptions.thumbnails !== undefined)
                                options.thumbnails = viewerOptions.thumbnails;
                            else
                                options.thumbnails = $(viewerContainer).find('#thumbnails-container');
                            if (viewerOptions !== undefined && viewerOptions.thumbnailsSlider !== undefined)
                                options.thumbnailsSlider = viewerOptions.thumbnailsSlider;
                            else
                                options.thumbnailsSlider = $(viewerContainer).find("#thumbs_btn");
                            if (viewerOptions !== undefined && viewerOptions.selectionContent !== undefined)
                                options.selectionContent = viewerOptions.selectionContent;
                            else
                                options.selectionContent = $(viewerContainer).find("#selection-content");
                        } else {
                            options.docSpace = $('.document_viewer');
                            options.navigation = $('#viewer-navigation');
                            options.zooming = $('#viewer-zoom');
                            options.thumbnails = $('#thumbnails-container');
                            options.thumbnailsSlider = $("#thumbs_btn");
                            options.selectionContent = $("#selection-content");
                        }
                        options.docViewerId = 'doc_viewer' + Math.floor(Math.random() * 9999) + 1;

                        viewerAdapter = new DocViewerAdapter(options);
                        viewerAdapter.docViewerWidget = viewerAdapter.docSpace;
                        viewerAdapter.docViewerViewModel.signatureBackgroundSvg = signatureBackgroundSvg;
                        viewerAdapter.docViewerViewModel.stampBackgroundSvg = stampBackgroundSvg;

                        //funciton is overriden because prepare of envelope/form doesn't work
                        viewerAdapter.docViewerViewModel.recalculatePageLeft = function() {};

                        viewerAdapter.docViewerWidget.bind('_onProcessPages', function (e, response) {
                            var model = viewerAdapter.docViewerViewModel;
                            var width = 0;
                            var height = 0;
                            if (typeof (response.page_size.Width) != "undefined") {
                                width = response.page_size.Width;
                                height = response.page_size.Height;
                            } else if (typeof (response.documentDescription) != "undefined") {
                                var documentDescription = JSON.parse(response.documentDescription);
                                width = documentDescription.widthForMaxHeight*2.083;
                                height = documentDescription.maxPageHeight*2.083;
                            }

                            model.heightWidthRatio = parseFloat(height / width);
                            model.pageHeight(Math.round(model.pageImageWidth * model.heightWidthRatio * (model.initialZoom / 100)));
                            model.originalPageWidth = width;
                            model.originalPageHeight = height;
                        });

                        if (viewerAdapter.docViewerViewModel._mode == 'embed') {
                            viewerAdapter.docViewerViewModel.initialZoom = (($('.document_viewer').width() - 2 * viewerAdapter.docViewerViewModel.imageHorizontalMargin - 20) / viewerAdapter.docViewerViewModel.initialWidth * 100);
                            viewerAdapter.docViewerViewModel.scale(viewerAdapter.docViewerViewModel.initialZoom / 100);
                        }
                    }
                    return viewerAdapter;
                };

            init();

            return {
                init: init,
                adapter: adapter
            };
        }
        return getInstance;
    });
(function ($, undefined) {
    $.widget('ui.SignatureUpload', {});
    $.extend($.ui.SignatureUpload.prototype, $.ui.uploader.prototype, {
        _portalService: Container.Resolve("PortalService"),
        _create: function () {
            this.options['onComplete'] = this._onUploadCompleted;
            $.ui.uploader.prototype._create.apply(this, arguments);
        },
        _onUploadCompleted: function (id, fid) {
            if (fid && fid.code && fid.code.toLowerCase() == "ok")
                $(this.element).trigger('onComplete', [fid, id]);
            if (fid && fid.error)
                jerror(fid.error);
        }
    });
})(jQuery);

(function () {
    var root = this;

    define3rdPartyModules();
    loadPluginsAndBoot();


    var downloadablePrefix = "";
    if ((typeof (gdSignaturePrefix) != "undefined") && gdSignaturePrefix) {
        var useHttpHandlers = (typeof (gdUseHttpHandlers) != "undefined" && gdUseHttpHandlers);
        downloadablePrefix = "/" + gdSignaturePrefix + (useHttpHandlers ? "-handler" : "/embedded");
    }

    require.config({
        baseUrl:  '/Scripts/Signature2/',
        paths: {
            "lib": downloadablePrefix + "/scripts/lib",
            "signatureUpload": downloadablePrefix + "/scripts/signature2/widgets/signatureUpload",
            "svgSignaturePad": downloadablePrefix + "/scripts/lib/signaturepad",
            "rasterSignaturePad": downloadablePrefix + "/scripts/lib/jquery.signaturepad.min",
            "webfont": "https://ajax.googleapis.com/ajax/libs/webfont/1.0.29/webfont"
        }
        
    });
    function define3rdPartyModules() {
        define('jquery', [], function () { return root.jQuery; });
        define('ko', [], function () { return root.ko; });
        define('lib/amplify', [], function () { return root.amplify; });
        define('lib/underscore', [], function () { return root._; });
        define('lib/sammy', [], function () { return root.Sammy; });
        if (root.jQuery.ui.SignatureUpload!=null)
            define('signatureUpload', [], function () { return root.jQuery.ui.SignatureUpload; });
    }
    
    function loadPluginsAndBoot() {
        require([], boot);
    }
    
    function boot() {
        require(['core/binder', 'ko', 'core/signalr'], function (bs, ko, signalr) {
            ko.validation.init({
                insertMessages: false,
                messagesOnModified: true,
                grouping: { deep: true, observable: true }
            });
            signalr.init();
            
        });
    }
})();
define("signDocument",
['jquery',
    'core/config',
    'core/binder',
    'core/vm',
    'signatureUpload'],
    function ($, config, binder, vm) {

        function getInstance() {

            var viewerContainer;
            var viewerOptions = {};
            var viewer;
            var vmDocumentSign = vm.documentSign(), vmSignaturePad = vm.signaturePad(), vmError = vm.error(), vmEnterName = vm.enterName();

            var signButton, signButtonContainer;
            var timer;
            var initUi = function() {
                $.ctrl = function() {
                };
                $("#mainwrapper").removeClass("mainwrap_sidescroll").css("top", "0px");


                //This is an IE fix because pointer-events does not work in IE
                $(document).on('mouseover','.fileApiContainer', '.doc-page', function (e) {
                    $(this).hide();
                    $(this).addClass('sign_input_field');
                    var bottomElement = document.elementFromPoint(e.clientX, e.clientY);
                    $(this).show();
                    $(bottomElement).trigger(e.type);
                    return false;
                });
                $(document).on('mouseleave', '.fileApiContainer', function (e) {
                    $(this).removeClass('sign_input_field');
                    $(".signature_doc_field").tooltip('hide');
                    return false;
                });

                },
                initViewModels = function () {
                    var self = this;
                    vmError.onBeforeShow = function () {
                        $('<div class="modal-backdrop"></div>').appendTo(viewerContainer);
                    };
                    vmError.onBeforeClose = function () {
                        $(viewerContainer).find(".modal-backdrop").remove();
                    };
                    if (showErrorDialog) vmError.isVisible(true);
                    else vmError.isVisible(false);
                    var fieldStartPosition = {x: 0, y: 0};

                    vmDocumentSign.isPublic(isPublic);
                    binder.bind($(viewerContainer).find("#viewer_mainwrapper"));

                    // Added for Signature 3
                    if (!window.groupdocs)
                        window.groupdocs = {};
                    var adapter = viewer.adapter(isPublic ? 'embed' : null).docViewerViewModel;
                    window.groupdocs.adapter = adapter;
                    adapter.vm = vmDocumentSign;
                    vmDocumentSign.documentId(documentId);
                    vmDocumentSign.viewerContainer(viewerContainer);
                    if ((typeof viewerOptions !== 'undefined') && (typeof viewerOptions.showHeader !== 'undefined') && !viewerOptions.showHeader) {
                        $(viewerContainer).find(".viewer_header").hide().height(0);
                        $(viewerContainer).find(".embed_signature").css("top", "0");
                    }
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.documentGuid != null)
                        vmDocumentSign.documentGuid(viewerOptions.documentGuid);
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.recipientGuid != null)
                        vmDocumentSign.recipientGuid(viewerOptions.recipientGuid);
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.showTypeItTab != null)
                        vmSignaturePad.showTypeItTab(viewerOptions.showTypeItTab);
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.showUploadTab != null)
                        vmSignaturePad.showUploadTab(viewerOptions.showUploadTab);
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.signaturePenColors != null && viewerOptions.signaturePenColors.length > 0) {
                        vmSignaturePad.signatureColors(viewerOptions.signaturePenColors);
                    }
                    $(viewerContainer).bind('onDocumentLoadComplete', function (e, data) {
                        // fix issue with IE and FF causing the dropdowns to close once they are clicked
                        $(viewerContainer).find(".pages_container").unbind("click");
                    });
                    if (config.isDownloadable && (typeof viewerOptions !== 'undefined') && viewerOptions.documentGuid != '' && viewerOptions.recipientGuid != '')
                        vmDocumentSign.getSignatureDocument(viewerOptions.documentGuid, viewerOptions.recipientGuid, function (doc) {
                            if (!doc.signedFromAll) {
                                if (doc.recipient.signed) {
                                    vmError.errorText("Please wait all recipients to sign");
                                    vmError.isVisible(true);
                                }
                                $(viewerContainer).find("button.sign_document").show();
                                if (doc.recipient.firstName == '' && doc.recipient.lastName=='')
                                    vmSignaturePad.signatureText("Anonymous");
                                else
                                    vmSignaturePad.signatureText(doc.recipient.firstName + ' ' + doc.recipient.lastName);
                                adapter.loadDocument(doc.name);
                            } else {
                                $(viewerContainer).find("button.sign_document").hide();
                                adapter.loadDocument(doc.signedName);
                            }
                        });
                    else
                        adapter.loadDocument(documentId);

                    vmSignaturePad.showSelectTab(!isPublic);
                    vmSignaturePad.showSaveButton(!isPublic);
                    vmEnterName.onNameSet.subscribe(function(newValue) {
                        signDocument(newValue, vmEnterName.signerName.email());
                    });
                    $(viewerContainer).find("#thumbs_btn").click(function() {
                        $(this).toggleClass("thumbs_btn_slide", 'slow');
                        $(viewerContainer).find(".thumbnailsContainer").toggle('slide', 'slow');
                        return false;
                    });
                    vmSignaturePad.savedSignatureAfterRender = function() {
                        var widthSignatureLi = 228;
                        $(viewerContainer).find('.signature-types').each(function() {
                            var countLi = $(this).find('li').size(),
                                addToEven = 0,
                                rawsLi = 1;
                            if ($('.modal-blue').hasClass('expanded')) {
                                if (countLi % 2) {
                                    addToEven = 1;
                                }
                                rawsLi = 2;
                                $(this).find('li:nth-child(' + (countLi + addToEven) / 2 + ')').find('.signature-type').addClass('last');
                            }
                            $(this).width((((countLi + addToEven) * widthSignatureLi) / rawsLi) - 10);
                            $(this).css({ 'margin-left': 0 });
                        });
                    };
                    $(viewerContainer).find(".document_viewer").delegate(".signature_doc_field_signature:has(svg):not(.foreign), .signature_doc_field_signature:has(img):not(.foreign), .signature_doc_field_signature:has(.sig_background):not(.foreign) ", "touchstart", function(e) {
                        fieldStartPosition.x = e.originalEvent.changedTouches[0].screenX;
                        fieldStartPosition.y = e.originalEvent.changedTouches[0].screenY;
                    });

                    // fix issue with dvselectable and Firefox, preventing text field to get focus once clicked
                    $(viewerContainer).find(".document_viewer").delegate("input, textarea", "click", function (e) {
                        this.focus();
                    });
                    $(viewerContainer).find(".document_viewer").delegate(".signature_doc_field_signature:has(svg):not(.foreign), .signature_doc_field_signature:has(img):not(.foreign), .signature_doc_field_signature:has(.sig_background):not(.foreign) ", "click touchend", function(e) {
                        if (e.type == 'touchend') {
                            if (e.originalEvent.changedTouches[0].screenX != fieldStartPosition.x || e.originalEvent.changedTouches[0].screenY != fieldStartPosition.y) return false;
                        }
                        var field = ko.contextFor(this).$parents[1];
                        vmSignaturePad.show();
                        
                        $(viewerContainer).find(".signature-dialog").undelegate();
                        $(viewerContainer).find(".signature-dialog").delegate("#apply-draw", "click", function () {
                            var signatureData = vmSignaturePad.applyDrawSignature();
                            if (signatureData == false)
                                return false;
                            if (vmSignaturePad.saveToMySignatures())
                                vmSignaturePad.saveSignature("", signatureData);
                            field.data(signatureData);
                            return false;
                        });
                        $(viewerContainer).find(".signature-dialog").delegate("#apply-upload", "click", function () {
                            if (vmSignaturePad.uploadedImage() == null) {
                                config.alert({ title: "Error", message: "Please upload the signature" });
                            } else {
                                vmSignaturePad.hide();
                                if (vmSignaturePad.saveToMySignatures())
                                    vmSignaturePad.saveSignature("", vmSignaturePad.uploadedImage());
                                field.data(vmSignaturePad.uploadedImage());
                            }
                            return false;
                        });
                        $(viewerContainer).find(".signature-dialog").delegate(".saved-signature", "click", function (e) {
                            if ($(e.srcElement).hasClass('svg-not-supported')) return false;
                            var signature = ko.contextFor(this).$data;
                            vmSignaturePad.hide();
                            field.data(signature.signatureImageUrl());
                            return false;
                        });
                        // Added for Signature 3
                        $(viewerContainer).find(".signature-dialog").delegate(".typed-signature,.applyTypedSignature", "click", function () {
                            // Added for Signature 3
                            //var fontName = ko.contextFor(this).$data;
                            var $this = $(this);
                            //var fontSize = $this.find('span').css('font-size');
                            var fontName = "Times New Roman";
                            var fontSize = "57px";
                            //var w = Math.floor($this.width());
                            //var h = Math.floor($this.height());
                            var w = 215;
                            var h = 82;
                            var signature;
                            if (vmSignaturePad.vectorPad())
                                signature = vmSignaturePad.createSvgFromTypedSignature(fontName, fontSize, w, h);
                            else
                                signature = vmSignaturePad.createImageFromTypedSignature(fontName, fontSize);
                            vmSignaturePad.hide();
                            if (vmSignaturePad.saveToMySignatures())
                                vmSignaturePad.saveSignature("", signature);
                            field.data(signature);
                            return false;
                        });
                        $(viewerContainer).find(".signature-dialog").delegate(".reset-signature", "click", function () {
                            vmSignaturePad.clear();
                        });
                        return false;
                    });

                    $(viewerContainer).find(".document_viewer").delegate(".signature_doc_field:has(input):not(.foreign)", "keyup", function (e) {
                        clearInterval(timer);
                        timer = setTimeout(function() {
                            if (!vmDocumentSign.hasCalcFields()) return;
                            $.each(vmDocumentSign.fields(), function (index, item) {
                                if (item.isCalcField()) {
                                    var formulaRegex = /(getField\("[\w\d\s]+"\)\.value)/g;
                                    var script = item.settings().calculationScript;
                                    script = script.replace(new RegExp('this.getField', 'g'), 'getField');
                                    var matches, output = [];
                                    while (matches = formulaRegex.exec(script)) {
                                        output.push(matches[1]);
                                    }
                                    $.each(output, function(index, field) {
                                        var fieldName = /getField\("(.+)"\)\.value/g.exec(field);
                                        if (fieldName != null) {
                                            var fieldData = ko.utils.arrayFirst(vmDocumentSign.fields(), function(documentField) {
                                                return documentField.name() == fieldName[1];
                                            });
                                            script = script.replace(new RegExp('getField\\("' + fieldName[1] + '"\\)\.value', 'g'), parseFloat(fieldData.data()) ? fieldData.data() : 0);
                                        }
                                    });
                                    script = script.replace(/AFMakeNumber/g, 'parseFloat');
                                    var event = {}; // needed for evaluating the script
                                    self["AFSimple_Calculate"] = AFSimple_Calculate;
                                    var calcResult = eval(script);
                                    if (!isNaN(calcResult) && calcResult != '-Infinity' && calcResult != 'Infinity') {
                                        item.data(calcResult);
                                    }
                                }
                            });
                        }, 500);
                    });

                    $(signButton).click(function (e) {
                        if ($(signButton).hasClass('disabled')) return false;
                        if (isPublic) {
                            if (config.isDownloadable && vmDocumentSign.recipient.firstName() != '' && vmDocumentSign.recipient.lastName() != '' && vmDocumentSign.recipient.email() != '')
                                signDocument();
                            else
                                vmEnterName.isVisible(true);
                        } else
                            signDocument(config.userName(), config.userEmail());
                        e.stopPropagation();
                        return false;
                    });
                    var signDocument = function(userName, email) {
                        $.confirm({
                            title: "Sign confirmation",
                            message: "Are you sure you want to sign this document?",
                            buttons: {
                                Yes: {
                                    'action': function() {
                                        $(viewerContainer).find(".loading_overlay").show();
                                        $(viewerContainer).find("button.sign_document").hide();
                                        vmDocumentSign.name(userName);
                                        vmDocumentSign.email(email);
                                        vmDocumentSign.signDocument(function (result) {
                                            if (config.isDownloadable) {
                                                $(viewerContainer).find(".loading_overlay").hide();
                                                if (result.signedFromAll != null && !result.signedFromAll) {
                                                    vmError.errorText("Please wait all recipients to sign");
                                                    vmError.isVisible(true);
                                                } else {
                                                    vmDocumentSign.fields.removeAll();
                                                    adapter.initialZoom = (($(viewerContainer).find('.document_viewer').width() - 2 * adapter.imageHorizontalMargin - 20) / adapter.initialWidth * 100);
                                                    adapter.scale(adapter.initialZoom / 100);
                                                    adapter.loadDocument(result.signedName);
                                                }
                                            }

                                        });
                                    }
                                },
                                No: {}
                            }
                        });
                    };

                    $(viewerContainer).on("onDocumentLoadComplete", function () {
                        vmDocumentSign.relativeCorrection(adapter.originalPageWidth / adapter.pageImageWidth);
                        // resizeWindows is moved here because of IE9 js error regarding dvselectable
                        function resizeWindow() {
                            adapter.scale((($('.document_viewer').width() - 2 * adapter.imageHorizontalMargin - 20) / adapter.initialWidth));
                            adapter.setZoom((($('.document_viewer').width() - 2 * adapter.imageHorizontalMargin - 20) / adapter.initialWidth) * 100);
                            if ($(":focus").length > 0 && ko.contextFor($(":focus")[0]) != null && ko.contextFor($(":focus")[0]).$data != null && ko.contextFor($(":focus")[0]).$data.selected!=null) {
                                ko.contextFor($(":focus")[0]).$data.selected(true);
                                ko.contextFor($(":focus")[0]).$data.selected.valueHasMutated();
                            }
                        }
                        var doResize;
                        var winWidth = $(window).outerWidth(), winHeight = $(window).outerHeight();
                        $(window).resize(function (e) {
                            //workaround for IE9
                            if (vmSignaturePad.isVisible()) return false;
                            var winNewWidth = $(window).outerWidth(),
                                winNewHeight = $(window).outerHeight();
                            if (winWidth != winNewWidth || winHeight != winNewHeight) {
                                clearTimeout(doResize);
                                doResize = setTimeout(resizeWindow, 100);
                            }
                            winWidth = winNewWidth;
                            winHeight = winNewHeight;

                            //if ($(e.target).hasClass("signature_doc_field")) return;
                            //clearTimeout(doResize);
                            //doResize = setTimeout(resizeWindow, 100);
                        });
                    });

                    if (!config.checkFileApiSupport()) {
                        window.FileAPI = {
                            debug: false,
                            cors: false,
                            media: false,
                            staticPath: (config.isDownloadable ? config.downloadablePrefix : "") + '/scripts/lib/fileApi/',
                            flashImageUrl: '/scripts/lib/fileApi/FileAPI.flash.image.swf',
                            postNameConcat: function (name, idx) {
                                return name + (idx != null ? '[' + idx + ']' : '');
                            }
                        };
                        requirejs.undef('lib/fileApi/FileAPI');
                        requirejs(['lib/fileApi/FileAPI'], function () { });
                    }

                    vmDocumentSign.init();
                },
                bindViewModels = function () {
                    binder.bind($(signButtonContainer), vmDocumentSign);
                    if (isPublic) {
                        binder.bind($(viewerContainer).find('#errorDialog'), vmError);
                        binder.bind($(viewerContainer).find('#enter-name-dialog'), vmEnterName);
                    }
                },
                setupSignaturePad = function () {
                    binder.bind($(viewerContainer).find('.signature-dialog'), vmSignaturePad);
                    vmSignaturePad.expanded(false);
                    if (typeof(signatureColor) != "undefined")
                        vmSignaturePad.signatureColor(signatureColor);
                    vmSignaturePad.signatureColor.subscribe(function(newValue) {
                        $(viewerContainer).find("#signature-draw-container-" + vmSignaturePad.padIndex() + " path").css("fill", newValue);
                    });
                },
                
                init = function(container, options) {
                    viewerContainer = container;
                    viewerOptions = options;

                    viewer = vm.viewer(container, options);
                    signButton = options.signButton !== undefined ? $(options.signButton) : $(viewerContainer).find(".sign_document");
                    signButtonContainer = options.signButtonContainer !== undefined ? $(options.signButtonContainer) : $(viewerContainer).find('.sign_button_container');

                    setupSignaturePad();
                    initUi();
                    initViewModels();
                    bindViewModels();
                },

                // Added for Signature 3
                setDocumentPath = function(path) {
                    vmDocumentSign.documentGuid(path);
                },
                // end

                loadDocument = function (path) {
                    vmDocumentSign.getSignatureDocument(viewerOptions.documentGuid, viewerOptions.recipientGuid, function (doc) {
                        if (!doc.signedFromAll) {
                            if (doc.recipient.signed) {
                                vmError.errorText("Please wait all recipients to sign");
                                vmError.isVisible(true);
                            }
                            $(viewerContainer).find("button.sign_document").show();
                            if (doc.recipient.firstName == '' && doc.recipient.lastName == '')
                                vmSignaturePad.signatureText("Anonymous");
                            else
                                vmSignaturePad.signatureText(doc.recipient.firstName + ' ' + doc.recipient.lastName);
                            //adapter.loadDocument(doc.name);
                            window.groupdocs.adapter.loadDocument(path);
                        } else {
                            $(viewerContainer).find("button.sign_document").hide();
                            //adapter.loadDocument(doc.signedName);
                            window.groupdocs.adapter.loadDocument(path);
                        }
                    });
                },

                // AcroJS calc field function
                AFSimple_Calculate = function (operator, items) {
                    var fields = ko.utils.arrayFilter(vmDocumentSign.fields(), function (field) {
                        return ko.utils.arrayFirst(items, function (item) {
                            return field.name() == item;
                        });
                    });
                    var fieldData = [];
                    $.each(fields, function (index, item) {
                        if (parseInt(item.data())) {
                            fieldData.push(parseInt(item.data()));
                        }
                    });
                    switch (operator) {
                        case "SUM":
                            var sum = 0;
                            $.each(fieldData, function (index, item) {
                                sum += parseInt(item) ? parseInt(item) : 0;
                            });
                            return sum;
                        case "PRD":
                            var prd = 1;
                            $.each(fieldData, function (index, item) {
                                prd *= parseInt(item) ? parseInt(item) : 1;
                            });
                            return prd;
                        case "AVG":
                            var avgSum = 0;
                            $.each(fieldData, function (index, item) {
                                avgSum += parseInt(item) ? parseInt(item) : 0;
                            });
                            var avg = avgSum / fieldData.length;
                            return avg;
                        case "MIN":
                            return Math.min.apply(Math, fieldData);
                        case "MAX":
                            return Math.max.apply(Math, fieldData);
                    };
                }

            return {
                init: init,
                setDocumentPath: setDocumentPath,
                loadDocument: loadDocument
            };
        }

        return getInstance;
    });

require(["signDocument"]);
define("prepareDocument",
    ['core/vm', 'core/binder', 'core/config', 'core/redirect'],
    function (vm, binder, config, redirect) {
        function getInstance() {
            var viewerContainer,
                vmViewer,
                viewerOptions = {},
                vmDocumentPrepare = vm.documentPrepare(),
                deselectField = function() {
                    $("input").blur();
                    $("textarea").blur();
                    $("select").blur();
                    $.each(vmDocumentPrepare.fields(), function() {
                        $.each(this.locations(), function() {
                            this.selected(false);
                        });
                    });
                    vmDocumentPrepare.selectedField(null);
                    vmDocumentPrepare.selectedLocation(null);
                },
                
                initViewer = function () {
                    
                    var adapter = vmViewer.adapter('embed');
                    adapter.docViewerViewModel.vm = vmDocumentPrepare;
                    adapter.docViewerWidget.bind('onDocumentLoadComplete', function(e, data) {
                        vmDocumentPrepare.loadSignatureFields();
                        // fix issue with IE causing the page to scroll to top when the page is clicked
                        $(viewerContainer).find(".pages_container").unbind("click");
                    });
                    if (config.isDownloadable && (typeof viewerOptions !== 'undefined') && viewerOptions.documentGuid != '' && viewerOptions.recipientGuid != '') {
                        vmDocumentPrepare.getSignatureDocument(viewerOptions.documentGuid, viewerOptions.recipientGuid, function(doc) {
                            adapter.docViewerViewModel.loadDocument(doc.name);

                        });
                    }
                    else
                        vmViewer.adapter().docViewerViewModel.loadDocument(documentId);
                    if ((typeof viewerOptions !== 'undefined') && viewerOptions.dateFormats != null && viewerOptions.dateFormats.length > 0) {
                        vmDocumentPrepare.dateFormats(viewerOptions.dateFormats);
                    }

                    $(document).keyup(function(event) {
                        $(".toolTip").tooltip('enable');
                    });
                    $(document).keydown(function(event) {
                        $(".toolTip").tooltip('hide');
                        $(".toolTip").tooltip('disable');
                        if ($(event.target).is('input') || $(event.target).is('textarea')) return true;
                        var field = vmDocumentPrepare.selectedField();
                        var location = vmDocumentPrepare.selectedLocation();
                        if (field == null || location == null)
                            return;
                        var pageImageWidth = vmViewer.adapter().docViewerViewModel.pageWidth();
                        var pageImageHeight = vmViewer.adapter().docViewerViewModel.pageHeight();
                        if (field != null && location != null) {
                            switch (event.keyCode) {
                            case 37: //left
                                if (event.ctrlKey) {
                                    if (location.locationX() - 1 / pageImageWidth > 0) {
                                        location.locationWidth(location.locationWidth() - 1);
                                        if (field.fieldType() == config.signatureFieldType.Signature)
                                            location.locationHeight(location.locationWidth() / 3);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                } else {
                                    if (location.locationX() - 1 / pageImageWidth > 0) {
                                        location.locationX(location.locationX() - 1 / pageImageWidth);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                }
                                break;
                            case 38: //up
                                if (event.ctrlKey) {
                                    if ((location.locationY() - 1 / pageImageHeight) > 0) {
                                        location.locationHeight(location.locationHeight() - 1);
                                        if (field.fieldType() == config.signatureFieldType.Signature)
                                            location.locationWidth(location.locationHeight() * 3);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                } else {
                                    if ((location.locationY() - 1 / pageImageHeight) > 0) {
                                        location.locationY(location.locationY() - 1 / pageImageHeight);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                }
                                break;
                            case 39: //right
                                if (event.ctrlKey) {
                                    var allowed = true;
                                    if (field.fieldType() == config.signatureFieldType.Signature) {
                                        var newHeight = (location.locationWidth() + 1) / 3;
                                        if (pageImageHeight * location.locationY() + newHeight >= pageImageHeight)
                                            allowed = false;
                                    }
                                    if (allowed && (pageImageWidth * location.locationX() + location.locationWidth() < pageImageWidth)) {
                                        location.locationWidth(location.locationWidth() + 1);
                                        if (field.fieldType() == config.signatureFieldType.Signature)
                                            location.locationHeight(location.locationWidth() / 3);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                } else {
                                    if (pageImageWidth * location.locationX() + location.locationWidth() < pageImageWidth) {
                                        location.locationX(location.locationX() + 1 / pageImageWidth);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                }
                                break;
                            case 40: //down
                                if (event.ctrlKey) {
                                    allowed = true;
                                    if (field.fieldType() == config.signatureFieldType.Signature) {
                                        var newWidth = (location.locationHeight() + 1) * 3;
                                        if (pageImageWidth * location.locationX() + newWidth >= pageImageWidth)
                                            allowed = false;
                                    }
                                    if (allowed && (pageImageHeight * location.locationY() + location.locationHeight() < pageImageHeight)) {
                                        location.locationHeight(location.locationHeight() + 1);
                                        if (field.fieldType() == config.signatureFieldType.Signature)
                                            location.locationWidth(location.locationHeight() * 3);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                } else {
                                    if (pageImageHeight * location.locationY() + location.locationHeight() < pageImageHeight) {
                                        location.locationY(location.locationY() + 1 / pageImageHeight);
                                        vmDocumentPrepare.updateMovedField(location, event);
                                    }
                                }
                                break;
                            case 67: //c
                                if (event.ctrlKey) {
                                    vmDocumentPrepare.copyFieldLocation(field, location);
                                }
                                break;
                            case 88: //x
                                if (event.ctrlKey) {
                                    vmDocumentPrepare.cutFieldLocation(field, location);
                                }
                                break;
                            case 46: //del
                                $.confirm({
                                    title: "Delete confirmation",
                                    message: "Are you sure you want to delete this field?",
                                    zIndex: '5050',
                                    buttons: {
                                        Yes: {
                                            'class': "",
                                            'action': function() {
                                                vmDocumentPrepare.deleteFieldLocation(field, location);
                                            }
                                        },
                                        No: {}
                                    }
                                });
                                break;
                            case 9: //tab
                                var locations = ko.observableArray([]);
                                    $.each(vmDocumentPrepare.fields(), function() {
                                        $.each(this.locations(), function() {
                                            locations.push(this);
                                        });
                                });


                                locations.sort(function(left, right) {
                                    return left.page() + left.locationY() == right.page() + right.locationY() ? 0 : (left.page() + left.locationY() < right.page() + right.locationY() ? -1 : 1);
                                });
                                var prevLocation;
                                var selectedLocationIndex = locations.indexOf(location);
                                if (event.shiftKey) {
                                    if (selectedLocationIndex > 0) {
                                        prevLocation = locations()[selectedLocationIndex - 1];
                                    } else {
                                        prevLocation = locations()[locations().length - 1];
                                    }
                                    prevLocation.selected(true);
                                    location.selected(false);
                                    vmDocumentPrepare.selectedField(
                                        $.grep(vmDocumentPrepare.fields(), function(f) {
                                            return f.id() == prevLocation.fieldId();
                                        })[0]);
                                    vmDocumentPrepare.selectedLocation(prevLocation);
                                    $("input").blur();
                                    $("textarea").blur();
                                    $("select").blur();

                                } else {
                                    var nextLocation;
                                    if (locations().length > selectedLocationIndex + 1) {
                                        nextLocation = locations()[selectedLocationIndex + 1];
                                    } else {
                                        nextLocation = locations()[0];
                                    }
                                    nextLocation.selected(true);
                                    location.selected(false);
                                    vmDocumentPrepare.selectedField(
                                        $.grep(vmDocumentPrepare.fields(), function(f) {
                                            return f.id() == nextLocation.fieldId();
                                        })[0]);
                                    vmDocumentPrepare.selectedLocation(nextLocation);
                                    $("input").blur();
                                    $("textarea").blur();
                                    $("select").blur();
                                }

                                var selectedField = $(".signature_doc_field.active");
                                if (selectedField.length == 1) {
                                    $('html, body').animate({
                                        scrollTop: selectedField.offset().top - 350
                                    }, 300);
                                }
                                break;
                            case 27: // esc
                                    deselectField();
                                break;
                            }
                        }
                        switch (event.keyCode) {
                        case 86: //v
                            if (event.ctrlKey && !event.shiftKey) {
                                vmDocumentPrepare.pasteNewField();
                            }
                            if (event.ctrlKey && event.shiftKey) {
                                vmDocumentPrepare.pasteNewLocation();
                            }
                            break;
                        case 49: //1
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(1);
                            }
                            break;
                        case 50: //2
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(2);
                            }
                            break;
                        case 51: //3
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(3);
                            }
                            break;
                        case 52: //4
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(4);
                            }
                            break;
                        case 53: //5
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(5);
                            }
                            break;
                        case 54: //6
                            if (event.ctrlKey) {
                                vmDocumentPrepare.addFieldFromMenu(6);
                            }
                            break;
                        }
                        return false;
                    });
                },
                initUi = function () {
                    $('link[rel=stylesheet][href*="signature/jqueryUI"]').remove();
                    $('.toolTip').tooltip();
                    $(".sidebar_tabs").tabs();
                    $.ctrl = function() {};

                    $("#tabs-3").delegate(".listbox", "click", function() {
                        vmDocumentPrepare.manageFields(ko.contextFor(this).$data.documentId());
                        return false;
                    });


                    $(".step5_wrapper").delegate(".prev-field", "click", function () {
                        var e = jQuery.Event("keydown");
                        e.keyCode = 9;
                        e.shiftKey = true;
                        $(document).trigger(e);
                        return false;
                    });
                    $(".step5_wrapper").delegate(".next-field", "click", function () {
                        var e = jQuery.Event("keydown");
                        e.keyCode = 9;
                        $(document).trigger(e);
                        return false;
                    });

                    $(".cancel_prepare").click(function() {
                        vmDocumentPrepare.cancelPrepare();
                        return false;
                    });

                    $(".document_viewer").delegate(".signature_doc_field", "click touchend", function() {
                        var location = ko.contextFor(this).$data;
                        var field = ko.contextFor(this).$parents[1];
                        if (vmDocumentPrepare.selectedLocation() != location) {
                            deselectField();
                            location.selected(true);
                            vmDocumentPrepare.selectedField(field);
                            vmDocumentPrepare.selectedLocation(location);
                        }
                        return false;
                    });
                    $(".document_viewer").delegate(".page-image", "click", function() {
                        deselectField();
                        return false;
                    });
                    $(".document_viewer").delegate(".signature_doc_field .popclose, .signature_doc_field .ta_del", "click", function() {
                        var location = ko.contextFor(this).$data;
                        var field = ko.contextFor(this).$parents[1];
                        $.confirm({
                            title: "Delete confirmation",
                            message: "Are you sure you want to delete this field?",
                            zIndex: '5050',
                            buttons: {
                                Yes: {
                                    'class': "",
                                    'action': function() {
                                        vmDocumentPrepare.deleteFieldLocation(field, location);;
                                        vmDocumentPrepare.selectedField(null);
                                        vmDocumentPrepare.selectedLocation(null);

                                    }
                                },
                                No: {}
                            }
                        });
                        return false;
                    });
                    $(".document_viewer").bind('onDocumentLoadComplete', function(e, data) {

                        var pageImageWidth = vmViewer.adapter().docViewerViewModel.pageWidth();
                        var pageImageHeight = vmViewer.adapter().docViewerViewModel.pageHeight();
                        vmDocumentPrepare.pageHeight(pageImageHeight);
                        vmDocumentPrepare.pageWidth(pageImageWidth);

                    });

                    $(".step5_wrapper").delegate(".close_settings", "click", function() {
                        deselectField();
                        return false;
                    });
                    

                    $(".step5_wrapper").delegate("ul.dropdown_values_list li", "click", function() {
                        vmDocumentPrepare.selectDefaultValue(ko.contextFor(this).$data);
                        return false;
                    });
                    $(".step5_wrapper").delegate("ul.dropdown_values_list a.delete", "click", function() {
                        vmDocumentPrepare.deleteAcceptableValue(ko.contextFor(this).$data);
                        return false;
                    });
                    $(".step5_wrapper").delegate(".copy-field", "click", function() {
                        vmDocumentPrepare.copyFieldLocation(vmDocumentPrepare.selectedField(), vmDocumentPrepare.selectedLocation());
                        return false;
                    });

                    $(".step5_wrapper").delegate(".paste-field", "click", function() {
                        $.confirm({
                            title: "Copy confirmation",
                            message: "You can copy field as a new field or to create a new location for the copied field. What do you want to do?",
                            zIndex: '5050',
                            buttons: {
                                'Copy Field': {
                                    'class': "btn red_button",
                                    'action': function() {
                                        vmDocumentPrepare.pasteNewField();
                                    }
                                },
                                'Create new location': {
                                    'class': "btn red_button",
                                    'action': function() {
                                        vmDocumentPrepare.pasteNewLocation();
                                    }
                                },
                                Cancel: {
                                    'class': "btn right"
                                }
                            }
                        });
                        return false;
                    });
                    $('.toolTip').tooltip();

                    var stickyNavigationOffsetTop = 90;
                    var stickyNavigation = function() {
                        //if ($.active > 0)
                        //    return;
                        var scrollTop = $(window).scrollTop() - stickyNavigationOffsetTop + 100;
                        var leftPos = 890;
                        if ($(".document_viewer").width() + $('.step5_tool_wrapper').width() > $(window).width()) {
                            leftPos = $(window).width() - $('.step5_tool_wrapper').width() - 50;
                        }
                        if (scrollTop > 0) {
                            $('.step5_tool_wrapper').css({ 'position': 'absolute', 'top': scrollTop + 'px', 'left': leftPos + 'px' });
                        } else {
                            $('.step5_tool_wrapper').css({ 'position': 'absolute', 'top': 'auto', 'left': leftPos + 'px' });
                        }
                    };
                    stickyNavigation();
                    $(window).scroll(function() {
                        stickyNavigation();
                    });

                    vmDocumentPrepare.selectedField.subscribe(function (newValue) {
                        $(".sidebar_tabs").tabs("select", 0);
                    });

                    vmDocumentPrepare.selectedLocation.subscribe(function (newValue) {
                        if (newValue == null) {
                            $(".signature_doc_field").tooltip('enable');
                        } else {
                            $(".signature_doc_field.active").tooltip('hide');
                            $(".signature_doc_field.active").tooltip('disable');
                        }
                    });

                    $('html').click(function() {
                        if ($(".dropdown_menu_button").hasClass('active')) {
                            $(".dropdown_menu_button.active").next(".dropdown_menu").hide('blind', 'fast');
                            $(".dropdown_menu_button.active").removeClass("active");
                        }
                        $(".toolTip").tooltip('hide');
                    });


                },

                init = function(container, options) {
                    viewerContainer = container;
                    viewerOptions = options;
                    vmDocumentPrepare.documentId(documentId);
                    vmDocumentPrepare.viewerContainer(viewerContainer);

                    binder.bind($(viewerContainer), vmDocumentPrepare);
                    $("#thumbs_btn").hide();
                    vmViewer = vm.viewer(container, options);
                    initViewer();

                    initUi();

                    vmDocumentPrepare.previewDocument(documentId);

                };

           
            return {
                init: init
            };
        }
        return getInstance;
    });
require(["prepareDocument"]);
