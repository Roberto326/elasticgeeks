# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150716005224) do

  create_table "categories", force: :cascade do |t|
    t.string   "name",        limit: 255,                   null: false
    t.integer  "parent_id",   limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "fields_def",  limit: 65535
    t.text     "description", limit: 65535
    t.string   "wiki_id",     limit: 255
    t.string   "wiki_name",   limit: 255
    t.boolean  "disabled",    limit: 1,     default: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "name",        limit: 255,                   null: false
    t.integer  "category_id", limit: 4
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "website",     limit: 255,                   null: false
    t.text     "fields",      limit: 65535
    t.text     "description", limit: 65535
    t.string   "wiki_id",     limit: 255
    t.string   "wiki_name",   limit: 255
    t.string   "wiki_logo",   limit: 255
    t.boolean  "disabled",    limit: 1,     default: false
  end

  add_index "items", ["name", "description", "wiki_name"], name: "items_fulltext", type: :fulltext
  add_index "items", ["wiki_id"], name: "index_items_on_wiki_id", using: :btree
  add_index "items", ["wiki_name"], name: "index_items_on_wiki_name", using: :btree

  create_table "license_items", force: :cascade do |t|
    t.integer "license_id", limit: 4, null: false
    t.integer "item_id",    limit: 4, null: false
  end

  create_table "licenses", force: :cascade do |t|
    t.string   "name",        limit: 255,   null: false
    t.text     "description", limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "platform_items", force: :cascade do |t|
    t.integer "platform_id", limit: 4, null: false
    t.integer "item_id",     limit: 4, null: false
  end

  create_table "platforms", force: :cascade do |t|
    t.string   "name",        limit: 255,   null: false
    t.text     "description", limit: 65535
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "trend_details", force: :cascade do |t|
    t.integer "category_id", limit: 4, null: false
    t.integer "item_id",     limit: 4, null: false
    t.date    "date",                  null: false
    t.integer "score",       limit: 4
  end

  add_index "trend_details", ["category_id", "item_id", "date"], name: "index_trend_details_on_category_id_and_item_id_and_date", using: :btree
  add_index "trend_details", ["category_id"], name: "index_trend_details_on_category_id", using: :btree
  add_index "trend_details", ["date"], name: "index_trend_details_on_date", using: :btree
  add_index "trend_details", ["item_id"], name: "index_trend_details_on_item_id", using: :btree

  create_table "trends", force: :cascade do |t|
    t.integer "category_id", limit: 4, null: false
    t.integer "item_id",     limit: 4, null: false
    t.integer "trend",       limit: 4
    t.integer "score",       limit: 4
    t.integer "rank",        limit: 4
    t.integer "rank_year",   limit: 4
    t.integer "real_trend",  limit: 4
  end

  add_index "trends", ["category_id", "item_id"], name: "index_trends_on_category_id_and_item_id", using: :btree
  add_index "trends", ["category_id"], name: "index_trends_on_category_id", using: :btree
  add_index "trends", ["item_id"], name: "index_trends_on_item_id", using: :btree
  add_index "trends", ["rank"], name: "index_trends_on_rank", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "",    null: false
    t.string   "encrypted_password",     limit: 255, default: "",    null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.integer  "failed_attempts",        limit: 4,   default: 0,     null: false
    t.string   "unlock_token",           limit: 255
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                  limit: 1,   default: false
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree

end
