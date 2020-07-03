---
id: groupdocs-signature-for-net-19-8-release-notes
url: signature/net/groupdocs-signature-for-net-19-8-release-notes
title: GroupDocs.Signature for .NET 19.8 Release Notes
weight: 5
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}This page contains release notes for GroupDocs.Signature for .NET 19.8{{< /alert >}}

## Major Features

{{< alert style="danger" >}}In this version we're introducing new public API which was designed to be simple and easy to use. For more details about new API please check Public Docs. The legacy API have been moved into Legacy namespace so after update to this version it is required to make project-wide replacement of namespace usages from GroupDocs.Signature. to GroupDocs.Signature.Legacy. to resolve build issues.{{< /alert >}}

  
Other notable features:

*   Added support for encryption several metadata signatures with same implementation when signing and searching 
*   Added support of file formats:
    *   Scalable Vector Graphics File (.svg) 
    *   Corel Draw File (.cdr)

## Full List of Issues Covering all Changes in this Release

| Key | Summary | Category |
| --- | --- | --- |
| SIGNATURENET-2202 | Implement Encryption setup to Sign Metadata at options level | Feature |
| SIGNATURENET-2204 | Implement Encryption setup for Search Metadata at Search Options level | Feature |
| SIGNATURENET-2149 | Implement new public Signature V2 API | Feature |
| SIGNATURENET-2154 | Unify document related options and classes for signing, verification and search processes | Improvement |

## Public API and Backward Incompatible Changes

{{< alert style="info" >}}This section lists public API changes that were introduced in GroupDocs.Signature for .NET 19.8. It includes not only new and obsoleted public methods, but also a description of any changes in the behavior behind the scenes in GroupDocs.Signature which may affect existing code. Any behavior introduced that could be seen as a regression and modifies existing behavior is especially important and is documented here.{{< /alert >}}

1.  ### All public types from GroupDocs.Signature namespace are moved and marked as obsolete    
    #### All public types from GroupDocs.Signature namespace     
    1.  Have been moved into **GroupDocs.Signature.Legacy** namespace
    2.  Marked as **Obsolete** with message: *This interface/class/enumeration is obsolete and will be available till January 2020 (v20.1).*
    
    #### Full list of types that have been moved and marked as obsolete:
    
    1. GroupDocs.Signature.Config.SignatureConfig => GroupDocs.Signature.Legacy.Config.SignatureConfig    
    2. GroupDocs.Signature.Domain.BarcodeSignature => GroupDocs.Signature.Legacy.Domain.BarcodeSignature    
    3. GroupDocs.Signature.Domain.BarcodeType => GroupDocs.Signature.Legacy.Domain.BarcodeType    
    4. GroupDocs.Signature.Domain.BarcodeTypes => GroupDocs.Signature.Legacy.Domain.BarcodeTypes    
    5. GroupDocs.Signature.Domain.BaseSignature => GroupDocs.Signature.Legacy.Domain.BaseSignature    
    6. GroupDocs.Signature.Domain.BorderLine => GroupDocs.Signature.Legacy.Domain.BorderLine    
    7. GroupDocs.Signature.Domain.CellsBarcodeSignature => GroupDocs.Signature.Legacy.Domain.CellsBarcodeSignature    
    8. GroupDocs.Signature.Domain.CellsDigitalSignature => GroupDocs.Signature.Legacy.Domain.CellsDigitalSignature    
    9. GroupDocs.Signature.Domain.CellsMetadataSignature => GroupDocs.Signature.Legacy.Domain.CellsMetadataSignature    
    10. GroupDocs.Signature.Domain.CellsQRCodeSignature => GroupDocs.Signature.Legacy.Domain.CellsQRCodeSignature    
    11. GroupDocs.Signature.Domain.CellsSaveFileFormat => GroupDocs.Signature.Legacy.Domain.CellsSaveFileFormat    
    12. GroupDocs.Signature.Domain.CellsTextShapeType => GroupDocs.Signature.Legacy.Domain.CellsTextShapeType    
    13. GroupDocs.Signature.Domain.CellsTextSignatureImplementation => GroupDocs.Signature.Legacy.Domain.CellsTextSignatureImplementation    
    14. GroupDocs.Signature.Domain.CodeTextAlignment => GroupDocs.Signature.Legacy.Domain.CodeTextAlignment    
    15. GroupDocs.Signature.Domain.Corners => GroupDocs.Signature.Legacy.Domain.Corners    
    16. GroupDocs.Signature.Domain.DashStyle => GroupDocs.Signature.Legacy.Domain.DashStyle    
    17. GroupDocs.Signature.Domain.DigitalSignature => GroupDocs.Signature.Legacy.Domain.DigitalSignature    
    18. GroupDocs.Signature.Domain.DigitalSignatureType => GroupDocs.Signature.Legacy.Domain.DigitalSignatureType    
    19. GroupDocs.Signature.Domain.DocumentDescription => GroupDocs.Signature.Legacy.Domain.DocumentDescription    
    20. GroupDocs.Signature.Domain.DocumentPart => GroupDocs.Signature.Legacy.Domain.DocumentPart    
    21. GroupDocs.Signature.Domain.ExtendedDashStyle => GroupDocs.Signature.Legacy.Domain.ExtendedDashStyle    
    22. GroupDocs.Signature.Domain.Extensions.Address => GroupDocs.Signature.Legacy.Domain.Extensions.Address    
    23. GroupDocs.Signature.Domain.Extensions.Brush => GroupDocs.Signature.Legacy.Domain.Extensions.Brush    
    24. GroupDocs.Signature.Domain.Extensions.Email => GroupDocs.Signature.Legacy.Domain.Extensions.Email    
    25. GroupDocs.Signature.Domain.Extensions.FormatAttribute => GroupDocs.Signature.Legacy.Domain.Extensions.FormatAttribute    
    26. GroupDocs.Signature.Domain.Extensions.IDataEncryption => GroupDocs.Signature.Legacy.Domain.Extensions.IDataEncryption    
    27. GroupDocs.Signature.Domain.Extensions.IDataSerializer => GroupDocs.Signature.Legacy.Domain.Extensions.IDataSerializer    
    28. GroupDocs.Signature.Domain.Extensions.LinearGradientBrush => GroupDocs.Signature.Legacy.Domain.Extensions.LinearGradientBrush    
    29. GroupDocs.Signature.Domain.Extensions.RadialGradientBrush => GroupDocs.Signature.Legacy.Domain.Extensions.RadialGradientBrush    
    30. GroupDocs.Signature.Domain.Extensions.SignatureExtension => GroupDocs.Signature.Legacy.Domain.Extensions.SignatureExtension    
    31. GroupDocs.Signature.Domain.Extensions.SkipSerializationAttribute => GroupDocs.Signature.Legacy.Domain.Extensions.SkipSerializationAttribute    
    32. GroupDocs.Signature.Domain.Extensions.SolidBrush => GroupDocs.Signature.Legacy.Domain.Extensions.SolidBrush    
    33. GroupDocs.Signature.Domain.Extensions.SymmetricAlgorithmType => GroupDocs.Signature.Legacy.Domain.Extensions.SymmetricAlgorithmType    
    34. GroupDocs.Signature.Domain.Extensions.SymmetricEncryption => GroupDocs.Signature.Legacy.Domain.Extensions.SymmetricEncryption    
    35. GroupDocs.Signature.Domain.Extensions.SymmetricEncryptionAttribute => GroupDocs.Signature.Legacy.Domain.Extensions.SymmetricEncryptionAttribute    
    36. GroupDocs.Signature.Domain.Extensions.TextShadow => GroupDocs.Signature.Legacy.Domain.Extensions.TextShadow    
    37. GroupDocs.Signature.Domain.Extensions.TextureBrush => GroupDocs.Signature.Legacy.Domain.Extensions.TextureBrush    
    38. GroupDocs.Signature.Domain.Extensions.VCard => GroupDocs.Signature.Legacy.Domain.Extensions.VCard    
    39. GroupDocs.Signature.Domain.FileDescription => GroupDocs.Signature.Legacy.Domain.FileDescription    
    40. GroupDocs.Signature.Domain.FormField.FormFieldSignature => GroupDocs.Signature.Legacy.Domain.FormField.FormFieldSignature    
    41. GroupDocs.Signature.Domain.FormField.FormFieldType => GroupDocs.Signature.Legacy.Domain.FormField.FormFieldType    
    42. GroupDocs.Signature.Domain.FormField.PdfCheckboxFormFieldSignature => GroupDocs.Signature.Legacy.Domain.FormField.PdfCheckboxFormFieldSignature    
    43. GroupDocs.Signature.Domain.FormField.PdfDigitalFormFieldSignature => GroupDocs.Signature.Legacy.Domain.FormField.PdfDigitalFormFieldSignature    
    44. GroupDocs.Signature.Domain.FormField.PdfTextFormFieldSignature => GroupDocs.Signature.Legacy.Domain.FormField.PdfTextFormFieldSignature    
    45. GroupDocs.Signature.Domain.HorizontalAlignment => GroupDocs.Signature.Legacy.Domain.HorizontalAlignment    
    46. GroupDocs.Signature.Domain.IAlignment => GroupDocs.Signature.Legacy.Domain.IAlignment    
    47. GroupDocs.Signature.Domain.ICellsPosition => GroupDocs.Signature.Legacy.Domain.ICellsPosition    
    48. GroupDocs.Signature.Domain.ImageMetadataSignature => GroupDocs.Signature.Legacy.Domain.ImageMetadataSignature    
    49. GroupDocs.Signature.Domain.ImagesBarcodeSignature => GroupDocs.Signature.Legacy.Domain.ImagesBarcodeSignature    
    50. GroupDocs.Signature.Domain.ImagesQRCodeSignature => GroupDocs.Signature.Legacy.Domain.ImagesQRCodeSignature    
    51. GroupDocs.Signature.Domain.ImagesSaveFileFormat => GroupDocs.Signature.Legacy.Domain.ImagesSaveFileFormat    
    52. GroupDocs.Signature.Domain.ImagesTextSignatureImplementation => GroupDocs.Signature.Legacy.Domain.ImagesTextSignatureImplementation    
    53. GroupDocs.Signature.Domain.IOpacity => GroupDocs.Signature.Legacy.Domain.IOpacity    
    54. GroupDocs.Signature.Domain.IRectangle => GroupDocs.Signature.Legacy.Domain.IRectangle    
    55. GroupDocs.Signature.Domain.IRotation => GroupDocs.Signature.Legacy.Domain.IRotation    
    56. GroupDocs.Signature.Domain.ITextAlignment => GroupDocs.Signature.Legacy.Domain.ITextAlignment    
    57. GroupDocs.Signature.Domain.MeasureType => GroupDocs.Signature.Legacy.Domain.MeasureType    
    58. GroupDocs.Signature.Domain.MetadataSignature => GroupDocs.Signature.Legacy.Domain.MetadataSignature    
    59. GroupDocs.Signature.Domain.MetadataSignatureCollection => GroupDocs.Signature.Legacy.Domain.MetadataSignatureCollection    
    60. GroupDocs.Signature.Domain.Padding => GroupDocs.Signature.Legacy.Domain.Padding    
    61. GroupDocs.Signature.Domain.PageDescription => GroupDocs.Signature.Legacy.Domain.PageDescription    
    62. GroupDocs.Signature.Domain.PathType => GroupDocs.Signature.Legacy.Domain.PathType    
    63. GroupDocs.Signature.Domain.PdfBarcodeSignature => GroupDocs.Signature.Legacy.Domain.PdfBarcodeSignature    
    64. GroupDocs.Signature.Domain.PDFDigitalSignature => GroupDocs.Signature.Legacy.Domain.PDFDigitalSignature    
    65. GroupDocs.Signature.Domain.PdfFormTextFieldType => GroupDocs.Signature.Legacy.Domain.PdfFormTextFieldType    
    66. GroupDocs.Signature.Domain.PdfMetadataSignature => GroupDocs.Signature.Legacy.Domain.PdfMetadataSignature    
    67. GroupDocs.Signature.Domain.PdfMetadataSignatures => GroupDocs.Signature.Legacy.Domain.PdfMetadataSignatures    
    68. GroupDocs.Signature.Domain.PdfQRCodeSignature => GroupDocs.Signature.Legacy.Domain.PdfQRCodeSignature    
    69. GroupDocs.Signature.Domain.PdfSaveFileFormat => GroupDocs.Signature.Legacy.Domain.PdfSaveFileFormat    
    70. GroupDocs.Signature.Domain.PdfTextAnnotationBorderEffect => GroupDocs.Signature.Legacy.Domain.PdfTextAnnotationBorderEffect    
    71. GroupDocs.Signature.Domain.PdfTextAnnotationBorderStyle => GroupDocs.Signature.Legacy.Domain.PdfTextAnnotationBorderStyle    
    72. GroupDocs.Signature.Domain.PdfTextSignatureImplementation => GroupDocs.Signature.Legacy.Domain.PdfTextSignatureImplementation    
    73. GroupDocs.Signature.Domain.PdfTextStickerIcon => GroupDocs.Signature.Legacy.Domain.PdfTextStickerIcon    
    74. GroupDocs.Signature.Domain.PdfTextStickerState => GroupDocs.Signature.Legacy.Domain.PdfTextStickerState    
    75. GroupDocs.Signature.Domain.Position => GroupDocs.Signature.Legacy.Domain.Position    
    76. GroupDocs.Signature.Domain.PositionInCellsDocument => GroupDocs.Signature.Legacy.Domain.PositionInCellsDocument    
    77. GroupDocs.Signature.Domain.ProcessStatus => GroupDocs.Signature.Legacy.Domain.ProcessStatus    
    78. GroupDocs.Signature.Domain.QRCodeSignature => GroupDocs.Signature.Legacy.Domain.QRCodeSignature    
    79. GroupDocs.Signature.Domain.QRCodeType => GroupDocs.Signature.Legacy.Domain.QRCodeType    
    80. GroupDocs.Signature.Domain.QRCodeTypes => GroupDocs.Signature.Legacy.Domain.QRCodeTypes    
    81. GroupDocs.Signature.Domain.ResizeType => GroupDocs.Signature.Legacy.Domain.ResizeType    
    82. GroupDocs.Signature.Domain.SearchResult => GroupDocs.Signature.Legacy.Domain.SearchResult    
    83. GroupDocs.Signature.Domain.SignatureFont => GroupDocs.Signature.Legacy.Domain.SignatureFont    
    84. GroupDocs.Signature.Domain.SignedDocumentInfo => GroupDocs.Signature.Legacy.Domain.SignedDocumentInfo    
    85. GroupDocs.Signature.Domain.SlidesBarcodeSignature => GroupDocs.Signature.Legacy.Domain.SlidesBarcodeSignature    
    86. GroupDocs.Signature.Domain.SlidesMetadataSignature => GroupDocs.Signature.Legacy.Domain.SlidesMetadataSignature    
    87. GroupDocs.Signature.Domain.SlidesQRCodeSignature => GroupDocs.Signature.Legacy.Domain.SlidesQRCodeSignature    
    88. GroupDocs.Signature.Domain.SlidesSaveFileFormat => GroupDocs.Signature.Legacy.Domain.SlidesSaveFileFormat    
    89. GroupDocs.Signature.Domain.SlidesTextShapeType => GroupDocs.Signature.Legacy.Domain.SlidesTextShapeType    
    90. GroupDocs.Signature.Domain.SlidesTextSignatureImplementation => GroupDocs.Signature.Legacy.Domain.SlidesTextSignatureImplementation    
    91. GroupDocs.Signature.Domain.SquareBorderLine => GroupDocs.Signature.Legacy.Domain.SquareBorderLine    
    92. GroupDocs.Signature.Domain.StampBackgroundCropType => GroupDocs.Signature.Legacy.Domain.StampBackgroundCropType    
    93. GroupDocs.Signature.Domain.StampLine => GroupDocs.Signature.Legacy.Domain.StampLine    
    94. GroupDocs.Signature.Domain.StampTextRepeatType => GroupDocs.Signature.Legacy.Domain.StampTextRepeatType    
    95. GroupDocs.Signature.Domain.StampType => GroupDocs.Signature.Legacy.Domain.StampType    
    96. GroupDocs.Signature.Domain.StampTypes => GroupDocs.Signature.Legacy.Domain.StampTypes    
    97. GroupDocs.Signature.Domain.StretchMode => GroupDocs.Signature.Legacy.Domain.StretchMode    
    98. GroupDocs.Signature.Domain.TextHorizontalAlignment => GroupDocs.Signature.Legacy.Domain.TextHorizontalAlignment    
    99. GroupDocs.Signature.Domain.TextMatchType => GroupDocs.Signature.Legacy.Domain.TextMatchType    
    100. GroupDocs.Signature.Domain.TextVerticalAlignment => GroupDocs.Signature.Legacy.Domain.TextVerticalAlignment    
    101. GroupDocs.Signature.Domain.VerificationResult => GroupDocs.Signature.Legacy.Domain.VerificationResult    
    102. GroupDocs.Signature.Domain.VerticalAlignment => GroupDocs.Signature.Legacy.Domain.VerticalAlignment    
    103. GroupDocs.Signature.Domain.WordsBarcodeSignature => GroupDocs.Signature.Legacy.Domain.WordsBarcodeSignature    
    104. GroupDocs.Signature.Domain.WordsDigitalSignature => GroupDocs.Signature.Legacy.Domain.WordsDigitalSignature    
    105. GroupDocs.Signature.Domain.WordsFormTextFieldType => GroupDocs.Signature.Legacy.Domain.WordsFormTextFieldType    
    106. GroupDocs.Signature.Domain.WordsMetadataSignature => GroupDocs.Signature.Legacy.Domain.WordsMetadataSignature    
    107. GroupDocs.Signature.Domain.WordsQRCodeSignature => GroupDocs.Signature.Legacy.Domain.WordsQRCodeSignature    
    108. GroupDocs.Signature.Domain.WordsSaveFileFormat => GroupDocs.Signature.Legacy.Domain.WordsSaveFileFormat    
    109. GroupDocs.Signature.Domain.WordsTextShapeType => GroupDocs.Signature.Legacy.Domain.WordsTextShapeType    
    110. GroupDocs.Signature.Domain.WordsTextSignatureImplementation => GroupDocs.Signature.Legacy.Domain.WordsTextSignatureImplementation    
    111. GroupDocs.Signature.Exception.GroupDocsSignatureException => GroupDocs.Signature.Legacy.Exception.GroupDocsSignatureException    
    112. GroupDocs.Signature.Handler.Input.IInputDataHandler => GroupDocs.Signature.Legacy.Handler.Input.IInputDataHandler    
    113. GroupDocs.Signature.Handler.Output.IOutputDataHandler => GroupDocs.Signature.Legacy.Handler.Output.IOutputDataHandler    
    114. GroupDocs.Signature.Handler.ProcessCompleteEventArgs => GroupDocs.Signature.Legacy.Handler.ProcessCompleteEventArgs    
    115. GroupDocs.Signature.Handler.ProcessCompleteEventHandler => GroupDocs.Signature.Legacy.Handler.ProcessCompleteEventHandler    
    116. GroupDocs.Signature.Handler.ProcessEventArgs => GroupDocs.Signature.Legacy.Handler.ProcessEventArgs    
    117. GroupDocs.Signature.Handler.ProcessProgressEventArgs => GroupDocs.Signature.Legacy.Handler.ProcessProgressEventArgs    
    118. GroupDocs.Signature.Handler.ProcessProgressEventHandler => GroupDocs.Signature.Legacy.Handler.ProcessProgressEventHandler    
    119. GroupDocs.Signature.Handler.ProcessStartEventArgs => GroupDocs.Signature.Legacy.Handler.ProcessStartEventArgs    
    120. GroupDocs.Signature.Handler.ProcessStartEventHandler => GroupDocs.Signature.Legacy.Handler.ProcessStartEventHandler    
    121. GroupDocs.Signature.Handler.SignatureHandler => GroupDocs.Signature.Legacy.Handler.SignatureHandler    
    122. GroupDocs.Signature.License => GroupDocs.Signature.Legacy.License    
    123. GroupDocs.Signature.Metered => GroupDocs.Signature.Legacy.Metered    
    124. GroupDocs.Signature.Options.BarcodeSignOptions => GroupDocs.Signature.Legacy.Options.BarcodeSignOptions
    125. GroupDocs.Signature.Options.BitmapCompression => GroupDocs.Signature.Legacy.Options.BitmapCompression    
    126. GroupDocs.Signature.Options.BmpSaveOptions => GroupDocs.Signature.Legacy.Options.BmpSaveOptions    
    127. GroupDocs.Signature.Options.CellsBarcodeSignOptions => GroupDocs.Signature.Legacy.Options.CellsBarcodeSignOptions    
    128. GroupDocs.Signature.Options.CellsMetadataSignOptions => GroupDocs.Signature.Legacy.Options.CellsMetadataSignOptions    
    129. GroupDocs.Signature.Options.CellsQRCodeSignOptions => GroupDocs.Signature.Legacy.Options.CellsQRCodeSignOptions    
    130. GroupDocs.Signature.Options.CellsSaveOptions => GroupDocs.Signature.Legacy.Options.CellsSaveOptions    
    131. GroupDocs.Signature.Options.CellsSearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.CellsSearchBarcodeOptions    
    132. GroupDocs.Signature.Options.CellsSearchDigitalOptions => GroupDocs.Signature.Legacy.Options.CellsSearchDigitalOptions    
    133. GroupDocs.Signature.Options.CellsSearchMetadataOptions => GroupDocs.Signature.Legacy.Options.CellsSearchMetadataOptions    
    134. GroupDocs.Signature.Options.CellsSearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.CellsSearchQRCodeOptions    
    135. GroupDocs.Signature.Options.CellsSignDigitalOptions => GroupDocs.Signature.Legacy.Options.CellsSignDigitalOptions    
    136. GroupDocs.Signature.Options.CellsSignImageOptions => GroupDocs.Signature.Legacy.Options.CellsSignImageOptions    
    137. GroupDocs.Signature.Options.CellsSignTextOptions => GroupDocs.Signature.Legacy.Options.CellsSignTextOptions    
    138. GroupDocs.Signature.Options.CellsStampSignOptions => GroupDocs.Signature.Legacy.Options.CellsStampSignOptions    
    139. GroupDocs.Signature.Options.CellsVerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.CellsVerifyBarcodeOptions    
    140. GroupDocs.Signature.Options.CellsVerifyDigitalOptions => GroupDocs.Signature.Legacy.Options.CellsVerifyDigitalOptions    
    141. GroupDocs.Signature.Options.CellsVerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.CellsVerifyQRCodeOptions    
    142. GroupDocs.Signature.Options.CellsVerifyTextOptions => GroupDocs.Signature.Legacy.Options.CellsVerifyTextOptions    
    143. GroupDocs.Signature.Options.DigitalSignatureAppearance => GroupDocs.Signature.Legacy.Options.DigitalSignatureAppearance    
    144. GroupDocs.Signature.Options.ExportImageSaveOptions => GroupDocs.Signature.Legacy.Options.ExportImageSaveOptions    
    145. GroupDocs.Signature.Options.GifSaveOptions => GroupDocs.Signature.Legacy.Options.GifSaveOptions    
    146. GroupDocs.Signature.Options.ImageAppearance => GroupDocs.Signature.Legacy.Options.ImageAppearance    
    147. GroupDocs.Signature.Options.ImagesBarcodeSignOptions => GroupDocs.Signature.Legacy.Options.ImagesBarcodeSignOptions    
    148. GroupDocs.Signature.Options.ImagesMetadataSignOptions => GroupDocs.Signature.Legacy.Options.ImagesMetadataSignOptions    
    149. GroupDocs.Signature.Options.ImagesQRCodeSignOptions => GroupDocs.Signature.Legacy.Options.ImagesQRCodeSignOptions    
    150. GroupDocs.Signature.Options.ImagesSaveOptions => GroupDocs.Signature.Legacy.Options.ImagesSaveOptions    
    151. GroupDocs.Signature.Options.ImagesSearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.ImagesSearchBarcodeOptions    
    152. GroupDocs.Signature.Options.ImagesSearchMetadataOptions => GroupDocs.Signature.Legacy.Options.ImagesSearchMetadataOptions    
    153. GroupDocs.Signature.Options.ImagesSearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.ImagesSearchQRCodeOptions    
    154. GroupDocs.Signature.Options.ImagesSignImageOptions => GroupDocs.Signature.Legacy.Options.ImagesSignImageOptions    
    155. GroupDocs.Signature.Options.ImagesSignTextOptions => GroupDocs.Signature.Legacy.Options.ImagesSignTextOptions    
    156. GroupDocs.Signature.Options.ImagesStampSignOptions => GroupDocs.Signature.Legacy.Options.ImagesStampSignOptions    
    157. GroupDocs.Signature.Options.ImagesVerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.ImagesVerifyBarcodeOptions    
    158. GroupDocs.Signature.Options.ImagesVerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.ImagesVerifyQRCodeOptions    
    159. GroupDocs.Signature.Options.JpegCompressionColorMode => GroupDocs.Signature.Legacy.Options.JpegCompressionColorMode    
    160. GroupDocs.Signature.Options.JpegCompressionMode => GroupDocs.Signature.Legacy.Options.JpegCompressionMode    
    161. GroupDocs.Signature.Options.JpegRoundingMode => GroupDocs.Signature.Legacy.Options.JpegRoundingMode    
    162. GroupDocs.Signature.Options.JpegSaveOptions => GroupDocs.Signature.Legacy.Options.JpegSaveOptions
    163. GroupDocs.Signature.Options.LoadOptions => GroupDocs.Signature.Legacy.Options.LoadOptions    
    164. GroupDocs.Signature.Options.MetadataSignOptions => GroupDocs.Signature.Legacy.Options.MetadataSignOptions    
    165. GroupDocs.Signature.Options.OutputType => GroupDocs.Signature.Legacy.Options.OutputType    
    166. GroupDocs.Signature.Options.PagesSetup => GroupDocs.Signature.Legacy.Options.PagesSetup    
    167. GroupDocs.Signature.Options.PdfBarcodeSignOptions => GroupDocs.Signature.Legacy.Options.PdfBarcodeSignOptions    
    168. GroupDocs.Signature.Options.PdfFormFieldSignOptions => GroupDocs.Signature.Legacy.Options.PdfFormFieldSignOptions    
    169. GroupDocs.Signature.Options.PdfMetadataSignOptions => GroupDocs.Signature.Legacy.Options.PdfMetadataSignOptions    
    170. GroupDocs.Signature.Options.PdfQRCodeSignOptions => GroupDocs.Signature.Legacy.Options.PdfQRCodeSignOptions    
    171. GroupDocs.Signature.Options.PdfSaveOptions => GroupDocs.Signature.Legacy.Options.PdfSaveOptions    
    172. GroupDocs.Signature.Options.PdfSearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.PdfSearchBarcodeOptions    
    173. GroupDocs.Signature.Options.PdfSearchDigitalOptions => GroupDocs.Signature.Legacy.Options.PdfSearchDigitalOptions    
    174. GroupDocs.Signature.Options.PdfSearchFormFieldOptions => GroupDocs.Signature.Legacy.Options.PdfSearchFormFieldOptions    
    175. GroupDocs.Signature.Options.PdfSearchMetadataOptions => GroupDocs.Signature.Legacy.Options.PdfSearchMetadataOptions    
    176. GroupDocs.Signature.Options.PdfSearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.PdfSearchQRCodeOptions    
    177. GroupDocs.Signature.Options.PdfSignDigitalOptions => GroupDocs.Signature.Legacy.Options.PdfSignDigitalOptions    
    178. GroupDocs.Signature.Options.PdfSignImageOptions => GroupDocs.Signature.Legacy.Options.PdfSignImageOptions    
    179. GroupDocs.Signature.Options.PdfSignTextOptions => GroupDocs.Signature.Legacy.Options.PdfSignTextOptions    
    180. GroupDocs.Signature.Options.PdfStampSignOptions => GroupDocs.Signature.Legacy.Options.PdfStampSignOptions    
    181. GroupDocs.Signature.Options.PdfTextAnnotationAppearance => GroupDocs.Signature.Legacy.Options.PdfTextAnnotationAppearance    
    182. GroupDocs.Signature.Options.PdfTextAnnotationVerifyExtensions => GroupDocs.Signature.Legacy.Options.PdfTextAnnotationVerifyExtensions    
    183. GroupDocs.Signature.Options.PdfTextStickerAppearance => GroupDocs.Signature.Legacy.Options.PdfTextStickerAppearance    
    184. GroupDocs.Signature.Options.PdfTextStickerVerifyExtensions => GroupDocs.Signature.Legacy.Options.PdfTextStickerVerifyExtensions    
    185. GroupDocs.Signature.Options.PDFVerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.PDFVerifyBarcodeOptions    
    186. GroupDocs.Signature.Options.PDFVerifyDigitalOptions => GroupDocs.Signature.Legacy.Options.PDFVerifyDigitalOptions    
    187. GroupDocs.Signature.Options.PDFVerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.PDFVerifyQRCodeOptions    
    188. GroupDocs.Signature.Options.PDFVerifyTextOptions => GroupDocs.Signature.Legacy.Options.PDFVerifyTextOptions    
    189. GroupDocs.Signature.Options.PngColorType => GroupDocs.Signature.Legacy.Options.PngColorType    
    190. GroupDocs.Signature.Options.PngFilterType => GroupDocs.Signature.Legacy.Options.PngFilterType    
    191. GroupDocs.Signature.Options.PngSaveOptions => GroupDocs.Signature.Legacy.Options.PngSaveOptions    
    192. GroupDocs.Signature.Options.QRCodeSignOptions => GroupDocs.Signature.Legacy.Options.QRCodeSignOptions    
    193. GroupDocs.Signature.Options.SaveOptions => GroupDocs.Signature.Legacy.Options.SaveOptions    
    194. GroupDocs.Signature.Options.SearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.SearchBarcodeOptions    
    195. GroupDocs.Signature.Options.SearchDigitalOptions => GroupDocs.Signature.Legacy.Options.SearchDigitalOptions    
    196. GroupDocs.Signature.Options.SearchFormFieldOptions => GroupDocs.Signature.Legacy.Options.SearchFormFieldOptions    
    197. GroupDocs.Signature.Options.SearchMetadataOptions => GroupDocs.Signature.Legacy.Options.SearchMetadataOptions    
    198. GroupDocs.Signature.Options.SearchOptions => GroupDocs.Signature.Legacy.Options.SearchOptions    
    199. GroupDocs.Signature.Options.SearchOptionsCollection => GroupDocs.Signature.Legacy.Options.SearchOptionsCollection    
    200. GroupDocs.Signature.Options.SearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.SearchQRCodeOptions    
    201. GroupDocs.Signature.Options.SignatureAppearance => GroupDocs.Signature.Legacy.Options.SignatureAppearance    
    202. GroupDocs.Signature.Options.SignatureOptionsCollection => GroupDocs.Signature.Legacy.Options.SignatureOptionsCollection    
    203. GroupDocs.Signature.Options.SignDigitalOptions => GroupDocs.Signature.Legacy.Options.SignDigitalOptions    
    204. GroupDocs.Signature.Options.SignImageOptions => GroupDocs.Signature.Legacy.Options.SignImageOptions    
    205. GroupDocs.Signature.Options.SignOptions => GroupDocs.Signature.Legacy.Options.SignOptions    
    206. GroupDocs.Signature.Options.SignTextOptions => GroupDocs.Signature.Legacy.Options.SignTextOptions    
    207. GroupDocs.Signature.Options.SlidesBarcodeSignOptions => GroupDocs.Signature.Legacy.Options.SlidesBarcodeSignOptions    
    208. GroupDocs.Signature.Options.SlidesMetadataSignOptions => GroupDocs.Signature.Legacy.Options.SlidesMetadataSignOptions    
    209. GroupDocs.Signature.Options.SlidesQRCodeSignOptions => GroupDocs.Signature.Legacy.Options.SlidesQRCodeSignOptions    
    210. GroupDocs.Signature.Options.SlidesSaveOptions => GroupDocs.Signature.Legacy.Options.SlidesSaveOptions    
    211. GroupDocs.Signature.Options.SlidesSearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.SlidesSearchBarcodeOptions    
    212. GroupDocs.Signature.Options.SlidesSearchMetadataOptions => GroupDocs.Signature.Legacy.Options.SlidesSearchMetadataOptions    
    213. GroupDocs.Signature.Options.SlidesSearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.SlidesSearchQRCodeOptions    
    214. GroupDocs.Signature.Options.SlidesSignDigitalOptions => GroupDocs.Signature.Legacy.Options.SlidesSignDigitalOptions    
    215. GroupDocs.Signature.Options.SlidesSignImageOptions => GroupDocs.Signature.Legacy.Options.SlidesSignImageOptions    
    216. GroupDocs.Signature.Options.SlidesSignTextOptions => GroupDocs.Signature.Legacy.Options.SlidesSignTextOptions    
    217. GroupDocs.Signature.Options.SlidesStampSignOptions => GroupDocs.Signature.Legacy.Options.SlidesStampSignOptions    
    218. GroupDocs.Signature.Options.SlidesVerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.SlidesVerifyBarcodeOptions    
    219. GroupDocs.Signature.Options.SlidesVerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.SlidesVerifyQRCodeOptions    
    220. GroupDocs.Signature.Options.SlidesVerifyTextOptions => GroupDocs.Signature.Legacy.Options.SlidesVerifyTextOptions    
    221. GroupDocs.Signature.Options.StampSignOptions => GroupDocs.Signature.Legacy.Options.StampSignOptions    
    222. GroupDocs.Signature.Options.TiffFormat => GroupDocs.Signature.Legacy.Options.TiffFormat    
    223. GroupDocs.Signature.Options.TiffSaveOptions => GroupDocs.Signature.Legacy.Options.TiffSaveOptions    
    224. GroupDocs.Signature.Options.VerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.VerifyBarcodeOptions    
    225. GroupDocs.Signature.Options.VerifyDigitalOptions => GroupDocs.Signature.Legacy.Options.VerifyDigitalOptions    
    226. GroupDocs.Signature.Options.VerifyExtensions => GroupDocs.Signature.Legacy.Options.VerifyExtensions    
    227. GroupDocs.Signature.Options.VerifyOptions => GroupDocs.Signature.Legacy.Options.VerifyOptions    
    228. GroupDocs.Signature.Options.VerifyOptionsCollection => GroupDocs.Signature.Legacy.Options.VerifyOptionsCollection    
    229. GroupDocs.Signature.Options.VerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.VerifyQRCodeOptions    
    230. GroupDocs.Signature.Options.VerifyTextOptions => GroupDocs.Signature.Legacy.Options.VerifyTextOptions    
    231. GroupDocs.Signature.Options.WordsBarcodeSignOptions => GroupDocs.Signature.Legacy.Options.WordsBarcodeSignOptions    
    232. GroupDocs.Signature.Options.WordsMetadataSignOptions => GroupDocs.Signature.Legacy.Options.WordsMetadataSignOptions    
    233. GroupDocs.Signature.Options.WordsQRCodeSignOptions => GroupDocs.Signature.Legacy.Options.WordsQRCodeSignOptions    
    234. GroupDocs.Signature.Options.WordsSaveOptions => GroupDocs.Signature.Legacy.Options.WordsSaveOptions    
    235. GroupDocs.Signature.Options.WordsSearchBarcodeOptions => GroupDocs.Signature.Legacy.Options.WordsSearchBarcodeOptions    
    236. GroupDocs.Signature.Options.WordsSearchDigitalOptions => GroupDocs.Signature.Legacy.Options.WordsSearchDigitalOptions    
    237. GroupDocs.Signature.Options.WordsSearchMetadataOptions => GroupDocs.Signature.Legacy.Options.WordsSearchMetadataOptions    
    238. GroupDocs.Signature.Options.WordsSearchQRCodeOptions => GroupDocs.Signature.Legacy.Options.WordsSearchQRCodeOptions    
    239. GroupDocs.Signature.Options.WordsSignDigitalOptions => GroupDocs.Signature.Legacy.Options.WordsSignDigitalOptions    
    240. GroupDocs.Signature.Options.WordsSignImageOptions => GroupDocs.Signature.Legacy.Options.WordsSignImageOptions    
    241. GroupDocs.Signature.Options.WordsSignTextOptions => GroupDocs.Signature.Legacy.Options.WordsSignTextOptions    
    242. GroupDocs.Signature.Options.WordsStampSignOptions => GroupDocs.Signature.Legacy.Options.WordsStampSignOptions    
    243. GroupDocs.Signature.Options.WordsVerifyBarcodeOptions => GroupDocs.Signature.Legacy.Options.WordsVerifyBarcodeOptions    
    244. GroupDocs.Signature.Options.WordsVerifyDigitalOptions => GroupDocs.Signature.Legacy.Options.WordsVerifyDigitalOptions    
    245. GroupDocs.Signature.Options.WordsVerifyQRCodeOptions => GroupDocs.Signature.Legacy.Options.WordsVerifyQRCodeOptions    
    246. GroupDocs.Signature.Options.WordsVerifyTextOptions => GroupDocs.Signature.Legacy.Options.WordsVerifyTextOptions