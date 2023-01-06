<div class="messageUserConsent" {if !$payload|empty}data-payload="{$payload}"{else}data-target="{$target}"{/if}>
	<div class="messageUserConsentHeader">
		<span class="messageUserConsentTitle">{lang}wcf.message.user.consent.title{/lang}</span>
		<a href="{$url}" class="messageUserConsentHost externalURL">{$host}</a>
	</div>
	<div class="messageUserConsentDescription">{lang}wcf.message.user.consent.description{/lang}</div>
	<div class="messageUserConsentButtonContainer">
		<button type="button" class="button small jsButtonMessageUserConsentEnable">{lang}wcf.message.user.consent.button.enable{/lang}</button>
	</div>
	<div class="messageUserConsentNotice">{lang}wcf.message.user.consent.notice{/lang}</div>
</div>
