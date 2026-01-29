/**
 * ============================================================================
 * TERRAFORM OUTPUTS - NextJS Foodies S3 Bucket
 * ============================================================================
 *
 * These outputs provide the values needed to configure the NextJS application.
 * After running `terraform apply`, use these values to update:
 * - lib/meals.js (Bucket name)
 * - next.config.js (hostname for remotePatterns)
 * - components/meals/meal-item.js (Image src URL)
 * - app/meals/[mealSlug]/page.js (Image src URL)
 */

output "bucket_name" {
  description = "Name of the S3 bucket (use in lib/meals.js s3.putObject)"
  value       = aws_s3_bucket.meals_images.id
}

output "bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.meals_images.arn
}

output "bucket_regional_domain" {
  description = "Regional domain name of the bucket"
  value       = aws_s3_bucket.meals_images.bucket_regional_domain_name
}

output "bucket_url" {
  description = "Full HTTPS URL for the bucket (use in Image src)"
  value       = "https://${aws_s3_bucket.meals_images.bucket_regional_domain_name}"
}

output "bucket_hostname" {
  description = "Hostname for next.config.js remotePatterns"
  value       = aws_s3_bucket.meals_images.bucket_regional_domain_name
}

output "usage_instructions" {
  description = "Instructions for using the bucket in NextJS"
  value       = <<-EOT

    ============================================================
    S3 BUCKET CREATED SUCCESSFULLY!
    ============================================================

    Bucket Name: ${aws_s3_bucket.meals_images.id}
    Bucket URL:  https://${aws_s3_bucket.meals_images.bucket_regional_domain_name}

    UPDATE THESE FILES:
    -------------------

    1. lib/meals.js - Update s3.putObject():
       Bucket: '${aws_s3_bucket.meals_images.id}'

    2. next.config.js - Update remotePatterns:
       hostname: '${aws_s3_bucket.meals_images.bucket_regional_domain_name}'

    3. components/meals/meal-item.js - Update Image src:
       src={`https://${aws_s3_bucket.meals_images.bucket_regional_domain_name}/$${image}`}

    4. app/meals/[mealSlug]/page.js - Update Image src:
       src={`https://${aws_s3_bucket.meals_images.bucket_regional_domain_name}/$${meal.image}`}

    UPLOAD IMAGES:
    --------------
    aws s3 cp ../assets/ s3://${aws_s3_bucket.meals_images.id}/ --recursive

    ============================================================
  EOT
}
