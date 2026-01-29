/**
 * ============================================================================
 * MAIN TERRAFORM CONFIGURATION - NextJS Foodies S3 Bucket
 * ============================================================================
 *
 * Creates an S3 bucket for storing user-uploaded meal images.
 * The bucket is configured for:
 * - Public read access (so images can be viewed in the browser)
 * - CORS (so the NextJS app can upload images)
 *
 * This follows the patterns from:
 * /home/hafnium/production/week2/twin/terraform/main.tf
 */

# Get current AWS account ID for unique bucket naming
data "aws_caller_identity" "current" {}

locals {
  name_prefix = "${var.project_name}-${var.environment}"

  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# =============================================================================
# S3 BUCKET FOR MEAL IMAGES
# =============================================================================

resource "aws_s3_bucket" "meals_images" {
  bucket = "${local.name_prefix}-meals-images-${data.aws_caller_identity.current.account_id}"
  tags   = local.common_tags
}

# =============================================================================
# PUBLIC ACCESS CONFIGURATION
# =============================================================================
# Unlike private buckets, we ALLOW public access because users need to
# view the meal images in their browser.

resource "aws_s3_bucket_public_access_block" "meals_images" {
  bucket = aws_s3_bucket.meals_images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# =============================================================================
# BUCKET OWNERSHIP CONTROLS
# =============================================================================

resource "aws_s3_bucket_ownership_controls" "meals_images" {
  bucket = aws_s3_bucket.meals_images.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# =============================================================================
# CORS CONFIGURATION
# =============================================================================
# Enable CORS so the NextJS app can upload images from the browser

resource "aws_s3_bucket_cors_configuration" "meals_images" {
  bucket = aws_s3_bucket.meals_images.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "HEAD"]
    allowed_origins = ["*"] # In production, restrict to your domain
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# =============================================================================
# BUCKET POLICY - PUBLIC READ ACCESS
# =============================================================================
# Allow anyone to read (GET) objects from the bucket.
# This is required for <Image> components to display S3 images.

resource "aws_s3_bucket_policy" "meals_images" {
  bucket = aws_s3_bucket.meals_images.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.meals_images.arn}/*"
      },
    ]
  })

  # Must wait for public access block to be disabled first
  depends_on = [aws_s3_bucket_public_access_block.meals_images]
}
