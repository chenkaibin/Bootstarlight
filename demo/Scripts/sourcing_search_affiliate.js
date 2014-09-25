
SMP.sourcing_search_affiliate = (function ($) {
    //定义option模版
    var optionTemplate = '<option value="{0}">{1}</option>';
    //定义列表中Enter按钮的模版
    var enterButtonTemplate = '<a href="{0}" class="enter" data-type="enter"><span>{1}</span></a>';
    //定义already exists提示
    var alreadyExistsMarkHtml = '<p name="AlreadyExistsMark" class="error">This field already exists</p>';

    var pageIndex = 1;
    var pageSize = 12;
    var flexigridObject = null;
    var legalNames = {};
    //记录选中的StateRegistered
    var selectedStateR = "";

    //$前缀表示控件
    var $searchAffiliateForm;
    var $legalName;
    var $dbaName;
    var $stateRegistered;
    var $copyAddressButton;
    var $payToAddressLine1;
    var $payToAddressLine2;
    var $payToCountry;
    var $payToState;
    var $payToCity;
    var $payToZip;
    var $overnightAddressContainer;
    var $overnightAddressLine1;
    var $overnightAddressLine2;
    var $overnightCountry;
    var $overnightState;
    var $overnightCity;
    var $overnightZip;
    var $entityTypeSelect;
    var $officePhoneAreaCode;
    var $officePhoneCentralOfficeCode;
    var $officePhoneStationCode;
    var $officePhoneExt;
    var $contactOfficeAreaCode;
    var $contactOfficeCentralOfficeCode;
    var $contactOfficeStationCode;
    var $contactOfficeExt;
    var $mobileAreaCode;
    var $mobileCentralOfficeCode;
    var $mobileStationCode;
    var $email;
    var $searchButton;
    var $cancelButton;
    var $newLeadButton;
    var $similarSearchResultsContainer;
    var $grid;
    var $pager;
    var $alert_search;

    //定义验证提示语
    var errorMessages = {
        officePhoneAreaCodeFormat: 'Please input a valid Office Phone #',
        officePhoneCentralOfficeCodeFormat: 'Please input a valid Office Phone #',
        officePhoneStationCodeFormat: 'Please input a valid Office Phone #',
        officePhoneExtFormat: 'Please input a valid Office Phone #',
        payToZipFormat: 'Please input a valid Zip code',
        overnightZipFormat: 'Please input a valid Zip code',
        contactOfficeAreaCodeFormat: 'Please input a valid Office #',
        contactOfficeCentralOfficeCodeFormat: 'Please input a valid Office #',
        contactOfficeStationCodeFormat: 'Please input a valid Office #',
        contactOfficeExtFormat: 'Please input a valid Office #',
        mobileAreaCodeFormat: 'Please input a valid Office #',
        mobileCentralOfficeCode: 'Please input a valid Office #',
        mobileStationCode: 'Please input a valid Office #',
        emailFormat: 'Please input a valid Email address.'
    };

    //初始化pageObject
    var pageObject = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totle: 0,
        flag: false,
        success: function (index) {
            flexigridObject.page = index;
            $grid.flexOptions(flexigridObject);
            $grid.flexReload(flexigridObject);
        }
    };

    //加载$state option数据(访问后台)   
    var getStates = function () {
        initStates($payToState, SMP.State);
        initStates($overnightState, SMP.State);
        initStates($stateRegistered, $.extend({ "N/A": "N/A" }, SMP.State));
        //if ($stateRegistered.GetSMPSelectValue() == "") {
        //    $stateRegistered.SetSMPSelectValue("N/A");
        //}
    };

    //将$state option数据付给$state
    var initStates = function ($state, states) {
        $state.empty();
        //var thisStatus = SMP.State;
        $state.SMPSelect(states, " ");
    };

    //改变overnightAddressContainer的显示状态
    var CopyAddress = function () {

    };

    //定义newLeadButton的点击事件
    var newLeadButtonClickHandler = function () {

    };

    //定义CancelButton的点击事件
    var CancelButtonClickHandler = function () {
        //跳转到列表页面
        SMP.GoToUrl("sourcing_list.html");
    };

    //配置flexigridObject
    var initFlexigrid = function () {
        flexigridObject = {
            width: 1450,
            Method: 'POST',
            nowrap: true,
            page: pageIndex,
            rp: 12,
            hideOnSubmit: false,
            dataType: 'json',
            colModel: [
                { display: 'Legal Name', name: 'Name', width: '120', sortable: false, align: 'center' },
                //{ display: 'DBA Name', name: 'DBAName', width: '80', sortable: false, align: 'center' },
                //{ display: 'Business Address', name: 'PayToAddress', width: '100', sortable: false, align: 'center' },
                //{ display: 'Mailing Address', name: 'OvernightAddress', width: '150', sortable: false, align: 'center' },
                //{ display: 'State', name: 'State', width: '40', sortable: false, align: 'center' },
                //{ display: 'City', name: 'City', width: '50', sortable: false, align: 'center' },
                //{ display: 'Zip', name: 'Zip', width: '50', sortable: false, align: 'center' },
                { display: 'Entity Type', name: 'EntityType', width: '120', sortable: false, align: 'center' },
                { display: 'State Registered', name: 'StateRegistered', width: '140', sortable: false, align: 'center' },
                { display: 'Office Phone #', name: 'OfficePhone', width: '120', sortable: false, align: 'center' },
                { display: 'Contact Office #', name: 'ContactOffice', width: '120', sortable: false, align: 'center' },
                { display: 'Mobile #', name: 'Mobile', width: '80', sortable: false, align: 'center' },
                //{ display: 'Email', name: 'Email', width: '120', sortable: false, align: 'center' },
                { display: 'Type', name: 'Type', width: '68', sortable: false, align: 'center' },
                //{ display: 'Enter', name: 'Enter', width: '60', sortable: false, align: 'center' }
            ],
            nowrap: false,
            usepager: false,
            resizable: false,
            newp: pageIndex,

            onSuccess: false
        };

        var searchResultFlexigrid = $grid.flexigrid(flexigridObject);
        searchResultFlexigrid.flexAddData(null);
        $newLeadButton.hide();
    };

    //查找Affiliate和Souring
    var searchAffiliateAndSouring = function (index) {
        pageIndex = index;

        var officePhone = "";
        if ($.trim($officePhoneAreaCode.val()) != "" && $.trim($officePhoneAreaCode.val()) != undefined)
            officePhone += $.trim($officePhoneAreaCode.val());
        if ($.trim($officePhoneCentralOfficeCode.val()) != "" && $.trim($officePhoneCentralOfficeCode.val()) != undefined)
            officePhone += "-" + $.trim($officePhoneCentralOfficeCode.val());
        if ($.trim($officePhoneStationCode.val()) != "" && $.trim($officePhoneStationCode.val()) != undefined)
            officePhone += "-" + $.trim($officePhoneStationCode.val());
        //if ($.trim($officePhoneExt.val()) != "" && $.trim($officePhoneExt.val()) != undefined)
        //    officePhone += "-" + $.trim($officePhoneExt.val());

        var contactOffice = "";
        if ($.trim($contactOfficeAreaCode.val()) != "" && $.trim($contactOfficeAreaCode.val()) != undefined)
            contactOffice += $.trim($contactOfficeAreaCode.val());
        if ($.trim($contactOfficeCentralOfficeCode.val()) != "" && $.trim($contactOfficeCentralOfficeCode.val()) != undefined)
            contactOffice += "-" + $.trim($contactOfficeCentralOfficeCode.val());
        if ($.trim($contactOfficeStationCode.val()) != "" && $.trim($contactOfficeStationCode.val()) != undefined)
            contactOffice += "-" + $.trim($contactOfficeStationCode.val());
        //if ($.trim($contactOfficeExt.val()) != "" && $.trim($contactOfficeExt.val()) != undefined)
        //    contactOffice += "-" + $.trim($contactOfficeExt.val());

        var mobile = "";
        if ($.trim($mobileAreaCode.val()) != "" && $.trim($mobileAreaCode.val()) != undefined)
            mobile += $.trim($mobileAreaCode.val());
        if ($.trim($mobileCentralOfficeCode.val()) != "" && $.trim($mobileCentralOfficeCode.val()) != undefined)
            mobile += "-" + $.trim($mobileCentralOfficeCode.val());
        if ($.trim($mobileStationCode.val()) != "" && $.trim($mobileStationCode.val()) != undefined)
            mobile += "-" + $.trim($mobileStationCode.val());

        var postData = {
            LegalName: $.trim($legalName.val()),
            DBAName: $.trim($dbaName.val()),
            StateRegistered: $stateRegistered.GetSMPSelectValue(),
            PayToAddress1: $.trim($payToAddressLine1.val()),
            PayToAddress2: $.trim($payToAddressLine2.val()),
            PayToCountry: $.trim($payToCountry.val()),
            PayToState: $.trim($payToState.GetSMPSelectValue()),
            PayToCity: $.trim($payToCity.val()),
            PayToZip: $.trim($payToZip.val()),
            OvernightAddressLine1: $.trim($overnightAddressLine1.val()),
            OvernightAddressLine2: $.trim($overnightAddressLine2.val()),
            OvernightCountry: $.trim($overnightCountry.val()),
            OvernightState: $.trim($overnightState.GetSMPSelectValue()),
            OvernightCity: $.trim($overnightCity.val()),
            OvernightZip: $.trim($overnightZip.val()),
            EntityType: $.trim($entityTypeSelect.GetSMPSelectValue()),
            OfficePhone: officePhone,
            ContactOffice: contactOffice,
            ContactMobile: mobile,
            ContactEmail: $.trim($email.val()),
            PageIndex: pageIndex,
            PageSize: pageSize
        };
        //是否包含查询数据
        var isHasSearchValue = true;

        //包含有查询数据才会 请求服务端查询数据
        if (isHasSearchValue) {
            var url = 'SourcingHandler_Search?rnd=' + new Date().getTime();
            SMP.Ajax.Post(url, JSON.stringify(postData), SMP.Ajax.DataType.JSON, function (data) {
                if (data.HasSame)
                    $alert_search.show();
                else
                    $alert_search.hide();
                $.each(data.Items, function (i, item) {
                    data.Items[i].Mobile = item.Mobile == "--" ? "" : item.Mobile;
                })

                data.Items = getAdjustList(data.Items, postData);
                var searchResultFlexigrid = $grid.flexigrid(flexigridObject);
                var temp = { "page": 1, "total": data.Total, "rows": data.Items };
                searchResultFlexigrid.flexAddData(temp);
                var souringData = postData;
                var sourcingDetail = {};
                $("[data-type=enter]").click(function () {
                    sourcingDetail = {
                        Name: souringData.LegalName,
                        DBAName: $.trim($dbaName.val()),
                        Phone: souringData.OfficePhone,
                        StateRegistered: souringData.StateRegistered,
                        EntityType: souringData.EntityType,
                        PayToAddressType: souringData.PayToAddressType,
                        Address: {
                            AddressLine1: souringData.PayToAddress1,
                            AddressLine2: souringData.PayToAddress2,
                            Country: souringData.PayToCountry,
                            State: souringData.PayToState,
                            City: souringData.PayToCity,
                            Zipcode: souringData.PayToZip
                        },
                        OvernightAddress: {
                            AddressLine1: souringData.OvernightAddressLine1,
                            AddressLine2: souringData.OvernightAddressLine2,
                            Country: souringData.OvernightCountry,
                            State: souringData.OvernightState,
                            City: souringData.OvernightCity,
                            Zipcode: souringData.OvernightZip
                        },
                        Contacts: [{
                            Phone: souringData.ContactOffice,
                            Mobile: souringData.ContactMobile,
                            Email: souringData.ContactEmail
                        }],
                        PageIndex: pageIndex
                    };
                    SMP.Cookie.Set("sourcing_search_affiliate_sourcingDetail", JSON.stringify(sourcingDetail));
                    SMP.Cookie.Set("Affiliate_Back_Url", SMP.URL().path);
                    SMP.GoToUrl($(this).attr("href"));
                });
                pageObject = {
                    pageIndex: index,
                    pageSize: pageSize,
                    totle: data.Total,
                    success: searchAffiliateAndSouring
                };
                $pager.starlight("page2", pageObject);

                $similarSearchResultsContainer.show();
                setLeadButton(data.HasSame, sourcingDetail);
            });
        }

    };

    //处理后台返回的Affiliate和Souring列表数据
    var getAdjustList = function (items, postData) {
        var officePhone = postData.OfficePhone;
        var contactOffice = postData.ContactOffice;
        var mobile = postData.ContactMobile;
        $.each(items, function (index, item) {
            var url = 'javascript: void (0)';
            if (item.Type == 'Sourcing') {
                if (item.Status != SMP.Affiliate.AffiliateStatus.Pending) {
                    url = 'sourcing_view.html?ID=' + item.Enter;
                }
                else {
                    url = 'sourcing_detail.html?ID=' + item.Enter;
                }
            }
            else {
                if (item.Status == SMP.Affiliate.AffiliateStatus.Prospect) {
                    url = '../CommonPages/affiliate_detail.html?ID=' + item.Enter;
                }
                else {
                    url = '../CommonPages/affiliate_view.html?ID=' + item.Enter;
                }
            }
            ////特殊处理  电话号码增加 ext.
            //var str = item.OfficePhone.toString().substr(item.OfficePhone.toString().lastIndexOf('-'), item.OfficePhone.toString().length);
            //str = str.replace('-', " ext. ");
            //var temp = item.OfficePhone.toString().substr(0, item.OfficePhone.toString().lastIndexOf('-')) + str;
            //item.OfficePhone = temp;
            item.OfficePhone = PhontAddExt(item.OfficePhone);
            ////特殊处理  电话号码增加 ext.
            //var str = item.ContactOffice.toString().substr(item.ContactOffice.toString().lastIndexOf('-'), item.ContactOffice.toString().length);
            //str = str.replace('-', " ext. ");
            //var temp = item.ContactOffice.toString().substr(0, item.ContactOffice.toString().lastIndexOf('-')) + str;
            //item.ContactOffice = temp;
            item.ContactOffice = PhontAddExt(item.ContactOffice);

            showAlreadyExistsMark($legalName, item.Name, postData.LegalName);
            showAlreadyExistsMark($dbaName, item.DBAName, postData.DBAName);
            showAlreadyExistsMark($officePhoneExt, item.OfficePhone, postData.OfficePhone);
            showAlreadyExistsMark($contactOfficeExt, item.ContactOffice, postData.ContactOffice);
            showAlreadyExistsMark($mobileStationCode, item.Mobile, postData.ContactMobile);
            showAlreadyExistsMark($email, item.Email, postData.ContactEmail);

            item.Name = replaceSouringDataValue(item.Name, postData.LegalName);
            item.DBAName = replaceSouringDataValue(item.DBAName, postData.DBAName);
            item.PayToAddress = replaceSouringDataValue(item.PayToAddress, postData.PayToAddress1);
            item.PayToAddress = replaceSouringDataValue(item.PayToAddress, postData.PayToAddress2);
            item.OvernightAddress = replaceSouringDataValue(item.OvernightAddress, postData.OvernightAddressLine1);
            item.OvernightAddress = replaceSouringDataValue(item.OvernightAddress, postData.OvernightAddressLine2);
            item.State = replaceSouringDataValue(item.PayToState, postData.PayToState);
            item.City = replaceSouringDataValue(item.PayToCity, postData.PayToCity);
            item.Zip = replaceSouringDataValue(item.PayToZip, postData.PayToZip);

            item.StateRegistered = replaceSouringDataValue(item.StateRegistered, postData.StateRegistered);

            item.EntityType = SMP.Affiliate.AffEntityTypeString[item.EntityType];
            item.EntityType = replaceSouringDataValue(item.EntityType, SMP.Affiliate.AffEntityTypeString[postData.EntityType]);

            item.OfficePhone = replaceSouringDataValue(item.OfficePhone, [contactOffice, officePhone, mobile]);

            item.ContactOffice = replaceSouringDataValue(item.ContactOffice, [contactOffice, officePhone, mobile]);

            item.Mobile = replaceSouringDataValue(item.Mobile, [contactOffice, officePhone, mobile]);
            item.Email = replaceSouringDataValue(item.Email, postData.ContactEmail);
            //affiliate.Type = replaceSouringDataValue(affiliate.Type, souringData.Type);没有输入框
            var $enter = $.format(enterButtonTemplate, url, item.Name);
            item.Name = $enter;
        });
        return items;
    };

    var PhontAddExt = function (phone) {
        if (!phone) {
            return phone;
        }
        var phoneItems = phone.split("-");
        var retPhone = "";
        if (phoneItems.length >= 4) {
            for (var pindex = 0; pindex < phoneItems.length; pindex++) {
                if (pindex == 3) {
                    if (phoneItems[3]) {
                        return retPhone += " ext. " + phoneItems[pindex];
                    } else {
                        return retPhone;
                    }
                }
                retPhone += phoneItems[pindex];
                if (pindex < 2) {
                    retPhone += "-";
                }
            }
            return retPhone;
        } else {
            return phone;
        }
    };

    //获取详细的电话号码或者Mobile(拆分使用)
    var getPhoneNumberDetail = function (value) {
        if (value.length == 0) {
            return ['', '', '', ''];
        }
        var areaCode = value.substring(0, 3);
        var centralOfficeCode = value.substring(3, 6);
        var stationCode = value.substring(6, 10);
        var ext = value.substring(10);
        var numberDetail = [areaCode, centralOfficeCode, stationCode, ext];
        return numberDetail;
    };

    //显示AlreadyExists标记
    var showAlreadyExistsMark = function ($data, value, compareValue) {
        return;
        if (value == null || value == '') {
            return;
        }
        if (value == compareValue) {
            if ($data.closest("div").find("p[name='AlreadyExistsMark']").length == 0) {
                $data.closest("div").append(alreadyExistsMarkHtml);
            }
        }
    };

    //替换affiliate的值(高亮符合搜索条件的文字)
    var replaceSouringDataValue = function (value, replaceValue) {
        if (value == null) {
            return "";
        }
        return value.toString().setHighlightColor(replaceValue);
    };

    //设置$newLeadButton
    var setLeadButton = function (hasSame, souringData) {
        var isFinish = true;
        $.each(options.rules, function (name, obj) {
            if (obj.required) {
                $("[name=" + name + "]").each(function (i, control) {
                    if (!$(control).val()) {
                        isFinish = false;
                    }
                });
            }
        });

        $.each(selectionValidationOptions.rules, function (name, obj) {
            if (obj.required) {
                $("#" + name).each(function (i, control) {
                    if (!$(control).GetSMPSelectValue()) {
                        isFinish = false;
                    }
                });
            }
        });

        isFinish = isFinish && CustomValidate();

        if (hasSame == true || hasSame == "true" || isFinish == false) {
            $newLeadButton.hide();
            newLeadButtonClickHandler = function () {
            };
        } else {
            newLeadButtonClickHandler = function () {

                var officePhone = "";
                if ($.trim($officePhoneAreaCode.val()) != "" && $.trim($officePhoneAreaCode.val()) != undefined)
                    officePhone += $.trim($officePhoneAreaCode.val());
                if ($.trim($officePhoneCentralOfficeCode.val()) != "" && $.trim($officePhoneCentralOfficeCode.val()) != undefined)
                    officePhone += "-" + $.trim($officePhoneCentralOfficeCode.val());
                if ($.trim($officePhoneStationCode.val()) != "" && $.trim($officePhoneStationCode.val()) != undefined)
                    officePhone += "-" + $.trim($officePhoneStationCode.val());
                if ($.trim($officePhoneExt.val()) != "" && $.trim($officePhoneExt.val()) != undefined)
                    officePhone += "-" + $.trim($officePhoneExt.val());

                var contactOffice = "";
                if ($.trim($contactOfficeAreaCode.val()) != "" && $.trim($contactOfficeAreaCode.val()) != undefined)
                    contactOffice += $.trim($contactOfficeAreaCode.val());
                if ($.trim($contactOfficeCentralOfficeCode.val()) != "" && $.trim($contactOfficeCentralOfficeCode.val()) != undefined)
                    contactOffice += "-" + $.trim($contactOfficeCentralOfficeCode.val());
                if ($.trim($contactOfficeStationCode.val()) != "" && $.trim($contactOfficeStationCode.val()) != undefined)
                    contactOffice += "-" + $.trim($contactOfficeStationCode.val());
                if ($.trim($contactOfficeExt.val()) != "" && $.trim($contactOfficeExt.val()) != undefined)
                    contactOffice += "-" + $.trim($contactOfficeExt.val());

                var mobile = "";
                if ($.trim($mobileAreaCode.val()) != "" && $.trim($mobileAreaCode.val()) != undefined)
                    mobile += $.trim($mobileAreaCode.val());
                if ($.trim($mobileCentralOfficeCode.val()) != "" && $.trim($mobileCentralOfficeCode.val()) != undefined)
                    mobile += "-" + $.trim($mobileCentralOfficeCode.val());
                if ($.trim($mobileStationCode.val()) != "" && $.trim($mobileStationCode.val()) != undefined)
                    mobile += "-" + $.trim($mobileStationCode.val());

                var postData = {
                    LegalName: $.trim($legalName.val()),
                    DbaName: $.trim($dbaName.val()),
                    StateRegistered: $stateRegistered.GetSMPSelectValue(),
                    PayToAddress1: $.trim($payToAddressLine1.val()),
                    PayToAddress2: $.trim($payToAddressLine2.val()),
                    PayToCountry: $.trim($payToCountry.val()),
                    PayToState: $.trim($payToState.GetSMPSelectValue()),
                    PayToCity: $.trim($payToCity.val()),
                    PayToZip: $.trim($payToZip.val()),
                    OvernightAddressLine1: $.trim($overnightAddressLine1.val()),
                    OvernightAddressLine2: $.trim($overnightAddressLine2.val()),
                    OvernightCountry: $.trim($overnightCountry.val()),
                    OvernightState: $.trim($overnightState.GetSMPSelectValue()),
                    OvernightCity: $.trim($overnightCity.val()),
                    OvernightZip: $.trim($overnightZip.val()),
                    EntityType: $.trim($entityTypeSelect.GetSMPSelectValue()),
                    OfficePhone: officePhone,
                    ContactOffice: contactOffice,
                    ContactMobile: mobile,
                    ContactEmail: $.trim($email.val()),
                    PageIndex: pageIndex,
                    PageSize: pageSize
                };

                var souringData = postData;
                var sourcingDetail = {
                    Name: souringData.LegalName,
                    DBAName: souringData.DbaName,
                    StateRegistered: souringData.StateRegistered,
                    Phone: souringData.OfficePhone,
                    EntityType: souringData.EntityType,
                    PayToAddressType: souringData.PayToAddressType,
                    Address: {
                        AddressLine1: souringData.PayToAddress1,
                        AddressLine2: souringData.PayToAddress2,
                        Country: souringData.PayToCountry,
                        State: souringData.PayToState,
                        City: souringData.PayToCity,
                        Zipcode: souringData.PayToZip
                    },
                    OvernightAddress: {
                        AddressLine1: souringData.OvernightAddressLine1,
                        AddressLine2: souringData.OvernightAddressLine2,
                        Country: souringData.OvernightCountry,
                        State: souringData.OvernightState,
                        City: souringData.OvernightCity,
                        Zipcode: souringData.OvernightZip
                    },
                    Contacts: [{
                        Phone: souringData.ContactOffice,
                        Mobile: souringData.ContactMobile,
                        Email: souringData.ContactEmail
                    }]
                };
                SMP.Cookie.Set("sourcing_search_affiliate_sourcingDetail", JSON.stringify(sourcingDetail));
                SMP.Cookie.Set("Affiliate_Back_Url", SMP.URL().path);
                window.location.href = 'sourcing_detail.html';
            };
            $newLeadButton.show();
        }
    };

    var IsCreateClicked = false;

    //定义验证配置对象
    var options = function () {
        var tempOptions = {
            rules: {
                LegalName: {
                    required: true
                },
                //Phone
                Phone_1: {
                    digits: true,
                    rangelength: [3, 3],
                    required: true
                },
                Phone_2: {
                    digits: true,
                    rangelength: [3, 3],
                    required: true
                },
                Phone_3: {
                    digits: true,
                    rangelength: [4, 4],
                    required: true
                },
                Phone_4: {
                    digits: true
                },
                //Mobile
                Mobile_1: {
                    digits: true,
                    rangelength: [3, 3],
                },
                Mobile_2: {
                    digits: true,
                    rangelength: [3, 3],
                },
                Mobile_3: {
                    digits: true,
                    rangelength: [4, 4],
                }
            },
            messages: {
                Phone_3: {
                    rangelength: "Please enter a 4-digit number."
                },
                Mobile_3: {
                    rangelength: "Please enter a 4-digit number."
                }
            }
        };

        var isAutoPhoneNumberBeforeTextLengthValidate = false;

        var validation = function (value, element, beforeTextIds) {
            var result = true;
            if (!$(element).val()) {
                var tempResult = false;
                $.each(beforeTextIds, function (index, beforeTextId) {
                    var $beforeText = $('#' + beforeTextId);
                    tempResult = tempResult || $(element).val();
                });
                //只有部分填了
                if (tempResult) {
                    result = false;
                }
            }

            if (!isAutoPhoneNumberBeforeTextLengthValidate) {
                isAutoPhoneNumberBeforeTextLengthValidate = true;
                $.each(beforeTextIds, function (index, beforeTextId) {
                    var $beforeText = $('#' + beforeTextId);
                    result = result && validation($beforeText.val(), $beforeText.get(0), tempOptions.rules[$beforeText.attr("name")].phoneNumberBeforeTextLength);
                });
                isAutoPhoneNumberBeforeTextLengthValidate = false;
            }

            if (result || !IsCreateClicked) {
                $(element).removeClass("heightborder");
                $(element).nextAll("p.error").eq(0).html("");
            }
            else {
                $(element).addClass("heightborder");
            }
            return result;
        };


        //验证电话号码文本框集合
        $.validator.addMethod("phoneNumberBeforeTextLength", validation, "");


        return tempOptions;
    }();

    var selectionValidationOptions = function () {
        return {
            rules: {
                PayToState: {
                    required: true,
                    validatorType: "Value"
                },
                OvernightState: {
                    required: true,
                    validatorType: "Value"
                },
                entityType: {
                    required: true,
                    validatorType: "Value"
                },
                stateRegistered: {
                    required: true,
                    validatorType: "Value"
                }
            },
            messages: {
                PayToState: {
                    required: "Plase select a state."
                },
                OvernightState: {
                    required: "Plase select a state."
                },
                entityType: {
                    required: "Plase select a entity type."
                },
                entityType: {
                    required: "Plase select a state."
                }

            }
        };
    }();

    var that = {};

    var CustomValidate = function () {
        if (($contactOfficeAreaCode.val() && $contactOfficeCentralOfficeCode.val() && $contactOfficeStationCode.val())) {
            return true;
        }
        return false;
    };

    var SearchFun = function (index) {
        $("[name='AlreadyExistsMark']").remove();
        searchAffiliateAndSouring(index);
    }

    that.initialize = function (ids) {
        $searchAffiliateForm = $(ids.searchAffiliateForm);
        $legalName = $(ids.legalName);
        $dbaName = $(ids.dbaName);
        $stateRegistered = $(ids.stateRegistered);
        $copyAddressButton = $(ids.copyAddressButton);
        $payToAddressLine1 = $(ids.payToAddressLine1);
        $payToAddressLine2 = $(ids.payToAddressLine2);
        $payToCountry = $(ids.payToCountry);
        $payToState = $(ids.payToState);
        $payToCity = $(ids.payToCity);
        $payToZip = $(ids.payToZip);
        $overnightAddressContainer = $(ids.overnightAddressContainer);
        $overnightAddressLine1 = $(ids.overnightAddressLine1);
        $overnightAddressLine2 = $(ids.overnightAddressLine2);
        $overnightCountry = $(ids.overnightCountry);
        $overnightState = $(ids.overnightState);
        $overnightCity = $(ids.overnightCity);
        $overnightZip = $(ids.overnightZip);
        $entityTypeSelect = $(ids.entityType);
        $officePhoneAreaCode = $(ids.officePhoneAreaCode);
        $officePhoneCentralOfficeCode = $(ids.officePhoneCentralOfficeCode);
        $officePhoneStationCode = $(ids.officePhoneStationCode);
        $officePhoneExt = $(ids.officePhoneExt);
        $contactOfficeAreaCode = $(ids.contactOfficeAreaCode);
        $contactOfficeCentralOfficeCode = $(ids.contactOfficeCentralOfficeCode);
        $contactOfficeStationCode = $(ids.contactOfficeStationCode);
        $contactOfficeExt = $(ids.contactOfficeExt);
        $mobileAreaCode = $(ids.mobileAreaCode);
        $mobileCentralOfficeCode = $(ids.mobileCentralOfficeCode);
        $mobileStationCode = $(ids.mobileStationCode);
        $email = $(ids.email);
        $searchButton = $(ids.searchButton);
        $alert_search = $(ids.alert_search);
        $cancelButton = $(ids.cancelButton);
        $newLeadButton = $(ids.newLeadButton);
        $similarSearchResultsContainer = $(ids.similarSearchResultsContainer);
        $grid = $(ids.grid);
        $pager = $(ids.pager);

        $entityTypeSelect.SMPSelect({
            "0": "LLC",
            "1": "LLP",
            "2": "Corporation",
            "3": "Sole Proprietor"
        }, " ");

        $entityTypeSelect.change(function () {
            if ($entityTypeSelect.GetSMPSelectValue() != SMP.Affiliate.AffEntityType.SoleProp) {
                //delete SMP.State["N/A"];
                //initStates($stateRegistered, SMP.State);[重新绑定会改变selectedStateR的值]
                $stateRegistered.find("li[hiddenvalue='N/A']").hide();
                //entity type改变之后，stateR仍选择上一次选择的值.值为N/A时，才选空
                if (selectedStateR == "N/A") {
                    $stateRegistered.SetSMPSelectValue("");
                }
                else {
                    $stateRegistered.SetSMPSelectValue(selectedStateR);
                }
            }
            else {
                //initStates($stateRegistered, $.extend({ "N/A": "N/A" }, SMP.State));
                //status==SoleProp,添加N/A选项
                $stateRegistered.find("li[hiddenvalue='N/A']").show();
                $stateRegistered.SetSMPSelectValue(selectedStateR);
            }
        });

        $stateRegistered.change(function () {
            selectedStateR = $(this).GetSMPSelectValue();
        });

        $legalName.autocomplete({ source: SMP.Affiliate.AutocompleteFun("Sourcing_LegalName", legalNames) });
        $copyAddressButton.change(CopyAddress);
        $cancelButton.click(CancelButtonClickHandler);
        $searchButton.click(function () {
            SearchFun(1);
        });

        //Validation扩展设置
        $.extend($.validator.messages, { rangelength: "Please enter a 3-digit number." });

        $newLeadButton.preBindRules(options);

        $newLeadButton.ValidateForm(options, function () {
            IsCreateClicked = true;
            $contactOfficeAreaCode.change(CustomValidate);
            $contactOfficeCentralOfficeCode.change(CustomValidate);
            $contactOfficeStationCode.change(CustomValidate);
            $mobileAreaCode.change(CustomValidate);
            $mobileCentralOfficeCode.change(CustomValidate);
            $mobileStationCode.change(CustomValidate);
            if (CustomValidate()) {
                $.fn.ValidateSMPSelect(selectionValidationOptions, function () {
                    newLeadButtonClickHandler();
                });
            }
            else {

            }
        }, function () {
            IsCreateClicked = true;
            $contactOfficeAreaCode.change(CustomValidate);
            $contactOfficeCentralOfficeCode.change(CustomValidate);
            $contactOfficeStationCode.change(CustomValidate);
            $mobileAreaCode.change(CustomValidate);
            $mobileCentralOfficeCode.change(CustomValidate);
            $mobileStationCode.change(CustomValidate);
            CustomValidate();
        });

        $($legalName, $dbaName, $officePhoneExt, $contactOfficeExt, $mobileStationCode, $email).change(function () {
            $(this).closest("div").find("p[name='AlreadyExistsMark']").remove();
        });
        //在给下拉单赋值之前先给下拉单绑定数据源
        getStates();

        var searchData = SMP.Cookie.Get("sourcing_search_affiliate_sourcingDetail");
        if (searchData) {
            searchData = JSON.parse(searchData);
            $legalName.val(searchData.Name);
            $dbaName.val(searchData.DBAName);
            $stateRegistered.SetSMPSelectValue(searchData.StateRegistered);
            if (searchData.Address) {
                $payToAddressLine1.val(searchData.Address.AddressLine1);
                $payToAddressLine2.val(searchData.Address.AddressLine2);
                $payToCountry.val(searchData.Address.Country);
                $payToState.SetSMPSelectValue(searchData.Address.State);
                $payToCity.val(searchData.Address.City);
                $payToZip.val(searchData.Address.Zipcode);
            }
            if (searchData.OvernightAddress) {
                $overnightAddressLine1.val(searchData.OvernightAddress.AddressLine1);
                $overnightAddressLine2.val(searchData.OvernightAddress.AddressLine2);
                $overnightCountry.val(searchData.OvernightAddress.Country);
                $overnightState.SetSMPSelectValue(searchData.OvernightAddress.State);
                $overnightCity.val(searchData.OvernightAddress.City);
                $overnightZip.val(searchData.OvernightAddress.Zipcode);
            }
            $entityTypeSelect.SetSMPSelectValue(searchData.EntityType);
            $officePhoneAreaCode.val(searchData.Phone.split("-")[0]);
            $officePhoneCentralOfficeCode.val(searchData.Phone.split("-")[1]);
            $officePhoneStationCode.val(searchData.Phone.split("-")[2]);
            $officePhoneExt.val(searchData.Phone.split("-")[3]);

            if (searchData.Contacts[0]) {
                if (searchData.Contacts[0].Phone) {
                    $contactOfficeAreaCode.val(searchData.Contacts[0].Phone.split("-")[0]);
                    $contactOfficeCentralOfficeCode.val(searchData.Contacts[0].Phone.split("-")[1]);
                    $contactOfficeStationCode.val(searchData.Contacts[0].Phone.split("-")[2]);
                    $contactOfficeExt.val(searchData.Contacts[0].Phone.split("-")[3]);
                }
                if (searchData.Contacts[0].Mobile) {
                    $mobileAreaCode.val(searchData.Contacts[0].Mobile.split("-")[0]);
                    $mobileCentralOfficeCode.val(searchData.Contacts[0].Mobile.split("-")[1]);
                    $mobileStationCode.val(searchData.Contacts[0].Mobile.split("-")[2]);
                    $email.val(searchData.Contacts[0].Email);
                }
            }
            if (searchData.PageIndex) {
                pageIndex = searchData.PageIndex;
            }
            if (searchData.PageSize) {
                pageSize = searchData.PageSize;
            }
            SearchFun(pageIndex);
            SMP.Cookie.Delete("sourcing_search_affiliate_sourcingDetail");
        }
        initFlexigrid();
        initCopyButton();
        //绑定电话号码等连续输入控制
        $.fn.PhoneInputControl([
            { input: $officePhoneAreaCode, length: 3, format: 2 },
            { input: $officePhoneCentralOfficeCode, length: 3, format: 2 },
            { input: $officePhoneStationCode, length: 4, format: 2 },
            { input: $officePhoneExt, format: 2 }
        ]);
        $.fn.PhoneInputControl([
            { input: $contactOfficeAreaCode, length: 3, format: 2 },
            { input: $contactOfficeCentralOfficeCode, length: 3, format: 2 },
            { input: $contactOfficeStationCode, length: 4, format: 2 },
            { input: $contactOfficeExt, format: 2 }
        ]);
        $.fn.PhoneInputControl([
            { input: $mobileAreaCode, length: 3, format: 2 },
            { input: $mobileCentralOfficeCode, length: 3, format: 2 },
            { input: $mobileStationCode, length: 4, format: 2 }
        ]);


    };

    var initCopyButton = function () {

        var isCopy = false;
        $("#copyAddress").change(function () {
            if ($("#copyAddress").GetCheckBoxVal()) {
                isCopy = true;
                $(".OvernightAddressContainer").find("small").hide();
                $(".OvernightAddressContainer").find("input").attr("disabled", "disabled").each(function (i, control) {
                    $(control).attr("data-syncTarget", $(control).attr("id"));
                });
                $(".OvernightAddressContainer").find("[data-type=back]").show();
                $(".OvernightAddressContainer").find("[data-control=select]").hide().each(function (i, control) {
                    $(control).attr("data-syncTarget", $(control).attr("id"));
                }).change();
                $("[data-sync]").change();
                isCopy = false;
            }
            else {
                $(".OvernightAddressContainer").find("small").show();
                $(".OvernightAddressContainer").find("[data-type=back]").hide();
                $(".OvernightAddressContainer").find("[data-control=select]").show().removeAttr("data-syncTarget");
                $(".OvernightAddressContainer").find("input").removeAttr("disabled").removeAttr("data-syncTarget");
            }
        });

        $("[data-sync]").change(function () {
            var syncTarget = $("[data-syncTarget=" + $(this).attr("data-sync") + "]").get(0);
            var value = "";
            var text = "";
            if ($(this).attr("type") == "checkbox") {
                value = this.checked;
            }
            else if ($(this).attr("type") == "radio") {
                var groupName = $(this).attr("name");
                id = groupName;
                value = $("input[name=" + groupName + "]:checked").val();
            }
            else if (this.tagName.toLowerCase() == "select" && ($(this).val() == "true" || $(this).val() == "false")) {
                value = $(this).val();
            }
            else if ($(this).attr("data-control") == "checkbox") {
                value = $(this).GetCheckBoxVal();
            }
            else if ($(this).attr("data-control") == "select") {
                value = $(this).GetSMPSelectValue();
                text = $(this).GetSMPSelectText()
                try {
                    var temp = eval(value);
                }
                catch (e) { }
                if (temp == undefined) {
                    value = value;
                }
            }
            else if ($(this).attr("type") == "text") {
                value = $(this).val();
            }
            else {
                value = $(this).val();
            }

            if (syncTarget) {

                var tagNames = function () {
                    return {
                        Html: ["label", "div", "span"],
                        Control: ["input", "checkbox", "select"]
                    };
                }();

                var controlType = syncTarget.tagName.toLowerCase();
                if ($(syncTarget).attr("data-control")) {
                    controlType = $(syncTarget).attr("data-control");
                }
                if (tagNames.Html.indexOf(controlType) > -1) {
                    $(syncTarget).html(text);
                }
                else if (tagNames.Control.indexOf(controlType) > -1) {
                    if (controlType == "checkbox") {
                        $(syncTarget).SetCheckBoxVal(value);
                    }
                    else if (controlType == "select") {
                        $(syncTarget).SetSMPSelectValue(value);
                    }
                    else {

                        $(syncTarget).val(value);
                    }
                }
            }
        });
        $("[data-sync]").change();
    };

    return that;
})(jQuery);


$(document).ready(function () {
    SMP.sourcing_search_affiliate.initialize({
        searchAffiliateForm: '#SearchAffiliateForm',
        legalName: '#LegalName',
        dbaName: '#DbaName',
        addressType: '#addressType',
        stateRegistered: "#stateRegistered",
        copyAddressButton: "#copyAddressButton",
        payToAddressLine1: '#PayToAddressLine1',
        payToAddressLine2: '#PayToAddressLine2',
        payToCountry: "#PayToCountry",
        payToState: '#PayToState',
        payToCity: '#PayToCity',
        payToZip: '#PayToZip',
        overnightAddressContainer: '.OvernightAddressContainer',
        overnightAddressLine1: '#OvernightAddressLine1',
        overnightAddressLine2: '#OvernightAddressLine2',
        overnightCountry: "#OvernightAddressCountry",
        overnightState: '#OvernightState',
        overnightCity: '#OvernightCity',
        overnightZip: '#OvernightZip',
        entityType: '#entityType',
        officePhoneAreaCode: '#OfficePhoneAreaCode',
        officePhoneCentralOfficeCode: '#OfficePhoneCentralOfficeCode',
        officePhoneStationCode: '#OfficePhoneStationCode',
        officePhoneExt: '#OfficePhoneExt',
        contactOfficeAreaCode: '#ContactOfficeAreaCode',
        contactOfficeCentralOfficeCode: '#ContactOfficeCentralOfficeCode',
        contactOfficeStationCode: '#ContactOfficeStationCode',
        contactOfficeExt: '#ContactOfficeExt',
        mobileAreaCode: '#MobileAreaCode',
        mobileCentralOfficeCode: '#MobileCentralOfficeCode',
        mobileStationCode: '#MobileStationCode',
        email: '#Email',
        searchButton: '#SearchButton',
        alert_search: '#alertSearch',
        cancelButton: '#CancelButton',
        newLeadButton: '#NewLeadButton',
        similarSearchResultsContainer: '#SimilarSearchResultsContainer',
        grid: '#grid',
        pager: '#pager'
    });
});
