# Restructure About.tsx: Replace Early Life section with LifeSketchFull component
# Keep Education timeline card in its own standalone section

$file = "c:\Users\Devil\Desktop\Jaglul\src\pages\About.tsx"
$lines = Get-Content $file -Encoding UTF8

$result = [System.Collections.Generic.List[string]]::new()

for ($i = 0; $i -lt $lines.Count; $i++) {
    # After Footer import (0-indexed 8, which is line 9), add LifeSketchFull import
    if ($i -eq 8) {
        $result.Add($lines[$i])
        $result.Add("import { LifeSketchFull } from '../components/LifeSketchFull';")
        continue
    }

    # Replace the entire "EARLY LIFE & EDUCATION" section (lines 207-486, 0-indexed: 206-485)
    if ($i -ge 206 -and $i -le 485) {
        if ($i -eq 206) {
            # Insert LifeSketchFull component
            $result.Add("        {/* ===== LIFE SKETCH ===== */}")
            $result.Add("        <LifeSketchFull />")
            $result.Add("")

            # Open a new standalone Education section
            $result.Add("        {/* ===== EDUCATION ===== */}")
            $result.Add('        <section className="py-16 bg-white">')
            $result.Add('          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">')
            $result.Add('            <div className="text-center mb-12">')
            $result.Add('              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Education</h2>')
            $result.Add('              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>')
            $result.Add('              <p className="text-army-oliveDark/70 max-w-2xl mx-auto">')
            $result.Add('                Complete academic timeline from primary school to ongoing PhD.')
            $result.Add('              </p>')
            $result.Add('            </div>')
            $result.Add('')
            $result.Add('            <div className="max-w-2xl mx-auto">')

            # Copy the Education timeline card from the original file
            # 0-indexed 307 = line 308: {/* Education Timeline */}
            # 0-indexed 308 = line 309: card div start
            # 0-indexed 482 = line 483: card div end
            for ($j = 307; $j -le 482; $j++) {
                $result.Add($lines[$j])
            }

            # Close the Education section
            $result.Add('            </div>')
            $result.Add('          </div>')
            $result.Add('        </section>')
        }
        # Skip all original lines in the old section
        continue
    }

    $result.Add($lines[$i])
}

# Write the restructured file
$result | Set-Content $file -Encoding UTF8
Write-Host "About.tsx restructured successfully. Lines: before=$($lines.Count) after=$($result.Count)"
