var HC = {};

/*----------------------Variables for ZD Custom Fields-------------------*/
//Conditional ids dependent on the domain name and switch between Sandbox and Prod
if (location.hostname === 'magento1544124303.zendesk.com') {
  console.log('in sandbox')
  var commerce_ticket_form_id = "360000396492";
  var	mom_ticket_form_id = "360000452471";
  var mbi_ticket_form_id = "360000457971";
  var shipping_ticket_form_id = "360000451992";
  var payments_ticket_form_id = "";
  var services_ticket_form_id = "";
  var store_fulfillment_ticket_form_id = "";
  var cloud_trial_ticket_form_id = "";
  var magento_version_field_id = "360014467892";
  var commerce_contact_reason_field_id = "360018810091";
  var surge_capacity_req_type_field_id = "";
  var cloud_project_url_id = "360014502131";
  var cloud_project_id_id = "360014467932";
  var cloud_project_region_id = "360021532111";
  var hc_url_id = "1544124303";
  var all_articles_category_id = "360002150451";
  var article_base_URL = "https://magento1544124303.zendesk.com/hc/en-us/articles/";

} else if (location.hostname === 'support.magento.com' || location.hostname === 'magento.zendesk.com') {
    var commerce_ticket_form_id = "114093977573";
    var	mom_ticket_form_id = "360000170751";
    var mbi_ticket_form_id = "360000174392";
    var shipping_ticket_form_id = "360000091093";
    var payments_ticket_form_id = "360000124611";
    var services_ticket_form_id = "6210338860429";
    var store_fulfillment_ticket_form_id = "5134951460749";
    var cloud_trial_ticket_form_id = "360000044974";
    var magento_version_field_id = "114098094614";
    var commerce_contact_reason_field_id = "360020836751";
    var surge_capacity_req_type_field_id = "360036567671";
    var cloud_project_url_id = "114098096114";
    var cloud_project_id_id = "114103558454";
    var cloud_project_region_id = "360021625892";
  	var hc_url_id = "";
  	var all_articles_category_id = "";
    var article_base_URL = "";
}

/************************************************************************************************/

$(document).ready(function() {
      
  // Temporary Banner close function
$('span.banner_close_btn').click(function() {
	$(this).parent().slideUp();
    console.log($(this).parent());
})

  /*------------------------------------------------------------------------------------------*/
  // Hide nesty input ticket type
  $(".request_ticket_form_id .nesty-input").hide();

  // Show regular input ticket type
  $(".request_ticket_form_id select").show();

  // Get user entitlements
  var userTags = HelpCenter.user.tags;
  var userOrgs = HelpCenter.user.organizations;
  var userEntitlement = [];
  if (HelpCenter.user.role !== 'anonymous') {
    var userOrgsCombined = [];
    for (var i = 0; i < userOrgs.length; i++) {
      userOrgsCombined = userOrgsCombined.concat(userOrgs[i].tags);
    }
    var userEntitlement = userTags;
    var userEntitlement = userEntitlement.concat(userOrgsCombined);
  }
  
  // Hide forms users are not entitled to
  
  if ($.inArray("entitlement_payments", userEntitlement) == -1) {
    $("option[value=" + payments_ticket_form_id +"]").remove();
  }
  if ($.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1) {
    $("option[value=" + store_fulfillment_ticket_form_id +"]").remove();
  }
  if ($.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
    $.inArray("tut_pro_cloud_trial", userEntitlement) == -1) {
    $("option[value=" + cloud_trial_ticket_form_id + "]").remove();
  }
  if ($.inArray("entitlement_mc_cloud", userEntitlement) == -1 && $.inArray("entitlement_mc_onprem", userEntitlement) == -1 && $.inArray("entitlement_mc_ams", userEntitlement) == -1) {
    $("option[value=" + commerce_ticket_form_id + "]").remove();
  }
  if ($.inArray("entitlement_magento_order_management", userEntitlement) == -1) {
    $("option[value=" + mom_ticket_form_id + "]").remove();
  }
  if ($.inArray("entitlement_mbi", userEntitlement) == -1) {
    $("option[value=" + mbi_ticket_form_id + "]").remove();
  }


  
  //hide stuff is not entitled at all
  if (userEntitlement.length == 0) {
  	  $(".request-follow-up").remove();
    	console.log('no entitlements');
      // $("option[value=" + services_ticket_form_id + "]").remove();
	}

  // hide submit ticket and my tickets if not entitled
  if ($.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
      $.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
      $.inArray("entitlement_mc_ams", userEntitlement) == -1 &&
      $.inArray("entitlement_partner", userEntitlement) == -1 &&
      $.inArray("entitlement_payments", userEntitlement) == -1 &&
      $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
			$.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
			$.inArray("entitlement_mbi", userEntitlement) == -1 &&
      $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
      $.inArray("tut_pro_cloud_trial", userEntitlement) == -1) {
        $(".submit-a-request").remove();
        $(".my-activities").remove();
        $(".subfooter").remove();
        // $("option[value=" + services_ticket_form_id + "]").remove();
      }
      
      // Show Form if User has only 1 Org Product Tag
      if ($("#new_request .form-field").length == 1) {
        var formUrl;
        if ($.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("tut_pro_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_cloud", userEntitlement) != -1) {
          formUrl = $("option[value=" + commerce_ticket_form_id + "]").attr("data-url");
          //Commerce Value
        }    
        if ($.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("tut_pro_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_onprem", userEntitlement) != -1) {
          formUrl = $("option[value=" + commerce_ticket_form_id + "]").attr("data-url");
          //On Prem Value
        }
        if ($.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("tut_pro_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_ams", userEntitlement) != -1) {
          formUrl = $("option[value=" + commerce_ticket_form_id + "]").attr("data-url");
          //AMS Value
        }
        
        if ($.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("tut_pro_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
        $.inArray("entitlement_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) != -1) {
          formUrl = $("option[value=" + payments_ticket_form_id + "]").attr("data-url");
          //Payments Value
        }
        
        if ($.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("tut_pro_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) != -1) {
          formUrl = $("option[value=" + store_fulfillment_ticket_form_id + "]").attr("data-url");
          //Store Fulfillment Value
        }
        
        if ($.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
        $.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("tut_starter_cloud_trial", userEntitlement) != -1) {
          formUrl = $("option[value=" + cloud_trial_ticket_form_id + "]").attr("data-url");
          //Cloud Trial Value
        }
        
        if ($.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
        $.inArray("entitlement_partner", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
        $.inArray("entitlement_mbi", userEntitlement) == -1 &&
        $.inArray("entitlement_payments", userEntitlement) == -1 &&
        $.inArray("entitlement_mc_store_fulfillment", userEntitlement) == -1 &&
      $.inArray("entitlement_magento_order_management", userEntitlement) != -1) {
      formUrl = $("option[value=" + mom_ticket_form_id + "]").attr("data-url");
      //MOM Value
    }
    if ($.inArray("tut_starter_cloud_trial", userEntitlement) == -1 &&
      $.inArray("entitlement_mc_cloud", userEntitlement) == -1 &&
      $.inArray("entitlement_partner", userEntitlement) == -1 &&
			$.inArray("entitlement_mc_onprem", userEntitlement) == -1 &&
      $.inArray("entitlement_payments", userEntitlement) == -1 &&
			$.inArray("entitlement_magento_order_management", userEntitlement) == -1 &&
      $.inArray("entitlement_mbi", userEntitlement) != -1) {
      formUrl = $("option[value=" + mbi_ticket_form_id + "]").attr("data-url");
      //MBI Value
    }
    
    if (formUrl != null) {
      window.location.href = formUrl;
    }
  }

  // Hide selection field if already selected
  if ($("#new_request .form-field").length !== 1) {
    $(".request_ticket_form_id").hide();
  }

/*--------------------Code to change the text on the new request page (ZD-)--------------------*/
  
   $("label[for=request_issue_type_select]").text("Please select the Magento Product for which you are seeking Support:");
  

    /*---------------------------Pop up Messages on New Request Form-------------------------*/
    // popup error message if old mage version
    $("#request_custom_fields_"+ magento_version_field_id).change(function (){
    
        var unsupported_list = [ "v1_14_4_3","v1_14_4_2","v1_14_4_1","v1_14_4_0","v1_14_3_10","v1_14_3_9","v1_14_3_8","v1_14_3_7","v1_14_3_6","v1_14_3_4","v1_14_3_3","v1_14_3_2","v1_14_3_1","v1_14_3_0","v1_14_2_4","v1_14_2_3","v1_14_2_2","v1_14_2_1","v1_14_2_0","v1_14_1_0","v1_14_0_1","v1_14_0_0","v1_13_1_0","v1_13_0_3","v1_13_0_2","v1_13_0_1","v1_13_0_0",
                                "v2_2_11_unsupported","v2_2_10_unsupported", "v2_2_9_unsupported", "v2_2_8_unsupported", "v2_2_7_unsupported", "v2_2_6_unsupported", "v2_2_5_unsupported", "v2_2_4_unsupported", "v2_2_3_unsupported", "v2_2_2_unsupported", "v2_2_1_unsupported", "v2_2_0_unsupported",
                                "v2_1_18_unsupported", "v2_1_17_unsupported", "v2_1_16_unsupported", "v2_1_15_unsupported", "v2_1_14_unsupported", "v2_1_13_unsupported", "v2_1_12_unsupported", "v2_1_11_unsupported", "v2_1_10_unsupported", "v2_1_9_unsupported", "v2_1_8_unsupported", "v2_1_7_unsupported", "v2_1_6_unsupported", "v2_1_5_unsupported", "v2_1_4_unsupported", "v2_1_3_unsupported", "v2_1_2_unsupported", "v2_1_1_unsupported", "v2_1_0_unsupported"];
        
        if (unsupported_list.includes($(this).val())) {
          window.alert("This version of Magento is no longer supported. Please consider upgrading.");
        } 
      });
      
       // popup message for ZD-711
        $("#request_custom_fields_"+ commerce_contact_reason_field_id).change(function (){
        
        var ssh_contact_reason = ["com_cr_enable_2fa_for_ssh_on_your_cloud_project", "com_cr_disable_2fa_for_ssh_on_your_cloud_project"];
        
        if (ssh_contact_reason.includes($(this).val())) {
          window.alert("The contact reason you have selected will initiate a process that will be handled via automation to enable 2FA for SSH on your Cloud project for all users. Please be sure that you are using the correct contact reason. \n \n In order for this request to be processed and completed, the ticket must be submitted by the project owner listed in the Cloud UI.");
        } 
      });
      
      
      // popup message for ZD-720
    $("#request_custom_fields_"+ commerce_contact_reason_field_id).change(function (){
          
      var surge_req_contact_reason = ["com_cr_surge_capacity_request"];
      
      if (surge_req_contact_reason.includes($(this).val())) {
        window.alert("Requests for temporary additional cloud capacity requires 48 hours advance notice to properly coordinate the change in configuration.");
      } 
    });
    
    // popup message for ZD-1171
    $("#request_custom_fields_"+ surge_capacity_req_type_field_id).change(function (){
          
      var holiday_req = ["surge_type_holiday_surge_request"];
      
      if (holiday_req.includes($(this).val())) {
        window.alert("You will be upsized to the next available size unless otherwise specified");
      } 
    });
    
    $("#request_custom_fields_"+ commerce_contact_reason_field_id).change(function (){
        var cloud_config_contact_reason = ["com_cr_request_a_cloud_configuration_change"];
        if (cloud_config_contact_reason.includes($(this).val())) {
          window.alert("Requests for cloud service configuration changes require 48 hours advance notice in order to properly coordinate the change in configuration. Requests made without proper advance notice may be unable to be scheduled to occur on the requested date.");
        }
      });
  
    /*---------------Function to hide the autofill sections---------------------*/
    $('.request_custom_fields_' + cloud_project_id_id).hide();
    $('.request_custom_fields_' + cloud_project_region_id).hide();
   
    
    /*--------Function to grab the Cloud Project ID and the Region from the Cloud Project URL (ZD-353)----------*/
    var cloudProjectUrl = $('#request_custom_fields_'+ cloud_project_url_id);
    var cloudProjectId = $('#request_custom_fields_' + cloud_project_id_id);
    var cloudProjectRegion = $('#request_custom_fields_' + cloud_project_region_id);
    
    $(cloudProjectUrl).change(function() {
      var projectUrl = cloudProjectUrl.val();
      var regexProjectId = /([^A-z0-9]+)([A-z0-9]{13})([^A-z0-9]{0,}|[^A-z0-9]+.*)$/;
          var regexRegion = /(\.|\/)([A-z]+[\-0-9]{0,})\.(magentosite|magento)\./
          var projectIdFound = projectUrl.match(regexProjectId);
          var regionFound = projectUrl.match(regexRegion);
      projectID = projectIdFound[2]
      region = regionFound[2]
  
      $(cloudProjectRegion).val(region);
          $(cloudProjectId).val(projectID);
  });
      
    /*---------------------Function to restrict contact reason fields------------------------------*/
      var pointer1 = $('.request_custom_fields_'+ commerce_contact_reason_field_id).children('a').attr('aria-controls');
    var skip1 = '#' + pointer1
    
    $(skip1).on('DOMNodeInserted', function(e){
      var nesty = $(this);
      
      //get all cr values
      var raw_cr_options = nesty.children('ul').children();
      
      var all_cr_options = raw_cr_options.map(function(cr){
        var li = raw_cr_options[cr];
        var id = li.getAttribute('id');
        return id;
      });
      
      var private_options = ['com_cr_proactive_outage_notification', 'com_cr_proactive_infrastructure_notification']
      
      //filter for only the desired values
      var remove_cr = all_cr_options.filter(function(cr){
        var li = all_cr_options[cr];
        return (private_options.includes(li)); 
      });
  
      remove_cr = remove_cr.map(function(cr){
        var li = remove_cr[cr];
       return ('#' + li);
      });
  
      remove_cr = Array.from(remove_cr);  
      
      try {
                  var i;
                  for (i = 0; i < remove_cr.length; i++) {
                  raw_cr_options.remove(remove_cr[i]);
              }
                  } catch (error) {
                      console.log (i);
                      console.log('ERROR!', error);
              }
    });
    
    /*--------------------Code to add helper text for ZD-714---------------------------------------*/
    
    $("<div id='org_id'>").insertBefore($('#request_organization_id_label'));
      $("div#org_id").append($('#request_organization_id_label'));
    
    $("<a class='org_help_text' href='https://support.magento.com/hc/en-us/articles/360020694351' target='_blank' rel='noopener noreferrer'>Not seeing an organization that was shared with you?</a>").insertAfter($("#request_organization_id_label"));
    
    $("div#org_id").css('display', 'flex');
    $("div#org_id").css('justify-content', "space-between");
    
    
      /*--------------------Code to hide fields from the sidebar on the request page----------------------------------------*/
    
    $('.request-details').children('dt').each(function(fieldID) {  
  
      if($(this).text() === "Implementation Type") {
        $(this).hide();
        $(this).nextAll().hide();
      }
  
      if($(this).text() === "Steps to Reproduce") {
        $(this).show();
        $(this).next().show();
      }
    });
  
  /***************************************************************************************/
  
    var _articleTitle = $('ol.breadcrumbs > li:nth-child(2) > a').html();
  
    $('.section-container .article-title').html(_articleTitle);
  
  /*--------------------Function to hide specific article (ZD-425)--------------------- */
    $('a.article-list-link:contains(Holiday capacity increases for)').hide();
  
    
  // function for the zd-accordion articles to work (ZD-154)
  
    $('.zd-accordion-text').hide();
  
    $('.zd-accordion-section').click(function() {
      if($(this).siblings().is(':hidden')) {
        $(this).siblings().slideDown();
      } else {
        $(this).siblings(".zd-accordion-text").slideUp()
      }
    });
    
      $('a.accordion-anchor').click(function(e) {
        $('div.zd-accordion-panel').css('margin-top', '1em');
  
        var hash = $(e.target.hash);
        hash.css('margin-top', '2em');
        $('.zd-accordion-text').slideUp();
        hash.children().slideDown();
    });
    
        $('a.accordion-back-to-step-1').click(function(e) {
        e.preventDefault();
        $('.zd-accordion-text').slideUp();
        $(e.target.hash).slideDown();
        var offset = $(e.target).offset();
        var step1 = $('.zd-accordion').offset();
        window.scrollTo(offset.left, step1.top - offset.top);
      });

});