{capture assign='pageTitle'}{lang}wcf.page.error.permissionDenied.title{/lang}{/capture}
{capture assign='contentTitle'}{lang}wcf.page.error.permissionDenied.title{/lang}{/capture}

{include file='header' __disableAds=true}

<div class="section">
	{if $message|isset}
		<p>{@$message}</p>
	{else}
		<p>{lang}wcf.page.error.permissionDenied{/lang}</p>
	{/if}
</div>

{event name='content'}

{if ENABLE_DEBUG_MODE}
	<!-- 
	{$name} thrown in {$file} ({@$line})
	Stacktrace:
	{$stacktrace}
	-->
{/if}

{include file='footer' __disableAds=true}
