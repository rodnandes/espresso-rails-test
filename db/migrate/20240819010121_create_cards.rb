class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :last4, limit: 4
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
