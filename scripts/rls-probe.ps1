# RLS probe — فقط GET (خواندن). هیچ نوشتن/حذفی انجام نمی‌شود.
# استفاده:  powershell -ExecutionPolicy Bypass -File scripts/rls-probe.ps1

$ErrorActionPreference = 'Continue'

$key  = 'sb_publishable_GFV7CIV6giwUhiOd7H8qsw_iFFx77FJ'
$base = 'https://egfayqsccxcvowolpmsg.supabase.co/rest/v1'

$tables = @(
    'products',
    'categories',
    'product_images',
    'orders',
    'order_items',
    'profiles',
    'users',
    'addresses'
)

foreach ($t in $tables) {
    $uri = "$base/$t" + '?select=*&limit=1'
    try {
        $r = Invoke-WebRequest -Uri $uri -Headers @{ apikey = $key } -Method GET -UseBasicParsing -TimeoutSec 20
        $code = $r.StatusCode
        $body = $r.Content
        if ($body.Length -gt 500) { $body = $body.Substring(0, 500) + '  ...<TRUNCATED>' }
        Write-Output "=== $t  ->  HTTP $code ==="
        Write-Output $body
    }
    catch {
        $code = $_.Exception.Response.StatusCode.value__
        $detail = ''
        try {
            $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $detail = $sr.ReadToEnd()
        } catch { }
        if ($detail.Length -gt 500) { $detail = $detail.Substring(0, 500) + '  ...<TRUNCATED>' }
        Write-Output "=== $t  ->  HTTP $code ==="
        Write-Output $detail
    }
    Write-Output ''
}
