# RLS discriminator — فقط GET. تفکیک «RLS فعال» از «جدول خالی».
# استفاده: powershell -ExecutionPolicy Bypass -Command "& '.\scripts\rls-count.ps1'"

$ErrorActionPreference = 'Continue'

$key  = 'sb_publishable_GFV7CIV6giwUhiOd7H8qsw_iFFx77FJ'
$base = 'https://egfayqsccxcvowolpmsg.supabase.co/rest/v1'

function Probe([string]$label, [string]$uri, [hashtable]$headers) {
    Write-Output "--- $label"
    Write-Output "    $uri"
    try {
        $r = Invoke-WebRequest -Uri $uri -Headers $headers -Method GET -UseBasicParsing -TimeoutSec 20
        Write-Output "    HTTP $($r.StatusCode)"
        Write-Output "    Content-Range: $($r.Headers['Content-Range'])"
        Write-Output "    X-Total-Count: $($r.Headers['x-total-count'])"
        $body = $r.Content
        if ($body.Length -gt 300) { $body = $body.Substring(0, 300) + ' ...<TRUNCATED>' }
        Write-Output "    body: $body"
    }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        Write-Output "    HTTP $code"
    }
    Write-Output ''
}

$hValid = @{}
$hValid['apikey'] = $key
$hValid['Prefer'] = 'count=exact'

$hNone = @{}

$hFake = @{}
$hFake['apikey'] = 'sb_publishable_THIS_IS_FAKE_000'

foreach ($t in @('products','categories','product_images','orders','order_items','favorites')) {
    $uri = $base + '/' + $t + '?select=id'
    Probe ($t + ' [valid key + count]') $uri $hValid
}

Probe 'orders [no key]'    "$base/orders?select=id"   $hNone
Probe 'products [no key]'  "$base/products?select=id" $hNone
Probe 'orders [fake key]'  "$base/orders?select=id"   $hFake
